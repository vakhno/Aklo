import cors from "cors";
import express from "express";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { toNodeHandler } from "better-auth/node";
import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient } from "mongodb";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { serverTestConfig } from "../config/server-test-config.js";
import { TestHelpers } from "better-auth/plugins";

// ─── Ports ────────────────────────────────────────────────────────────────────

export const TEST_BACKEND_PORT = 3001;
export const TEST_MONGO_PORT   = 27018;

export const TEST_BACKEND_URL  = `http://localhost:${TEST_BACKEND_PORT}`;
export const TEST_FRONTEND_URL = "http://localhost:5183";

// ─── Fake Google OAuth responses (must match what auth.spec.ts asserts) ───────

export const FAKE_GOOGLE_USER = {
	sub:            "google-uid-123456",
	email:          "testuser@gmail.com",
	email_verified: true,
	name:           "Test User",
	given_name:     "Test",
	family_name:    "User",
	picture:        "https://lh3.googleusercontent.com/fake-picture",
};

const FAKE_GOOGLE_TOKEN = {
	access_token: "fake-access-token",
	token_type:   "Bearer",
	expires_in:   3600,
	scope:        "openid email profile",
	id_token:     "fake-id-token",
};

// ─── MSW: intercept Node.js fetch to Google APIs (server-side token exchange) ─
//
// better-auth calls these endpoints from Node.js (not the browser), so
// page.route() can't reach them. MSW's Node.js server intercepts
// undici-based fetch requests, which is what Node 18+ uses internally.

const mswServer = setupServer(
	http.post("https://oauth2.googleapis.com/token", () =>
		HttpResponse.json(FAKE_GOOGLE_TOKEN),
	),
	http.get("https://www.googleapis.com/oauth2/v2/userinfo", () =>
		HttpResponse.json(FAKE_GOOGLE_USER),
	),
);

mswServer.listen({ onUnhandledRequest: "bypass" });

// ─── MongoDB + better-auth ────────────────────────────────────────────────────
//
// CI: use MONGODB_URI (GitHub Actions service container) to avoid downloading
// MongoDB binaries via mongodb-memory-server.
// Local: fall back to MongoMemoryServer on TEST_MONGO_PORT.

let mongod: MongoMemoryServer | null = null;

const mongoUri = process.env.MONGODB_URI
	?? (mongod = await MongoMemoryServer.create({ instance: { port: TEST_MONGO_PORT } })).getUri();

const mongoClient = new MongoClient(mongoUri);
await mongoClient.connect();
const db = mongoClient.db("better-auth-test");

const auth = betterAuth(serverTestConfig({
	basePath:           "/api/auth",
	database:           mongodbAdapter(db, { client: mongoClient }),
	baseUrl:            TEST_BACKEND_URL,
	secret:             "test-secret-for-e2e-do-not-use-in-prod",
	googleClientId:     "fake-google-client-id",
	googleClientSecret: "fake-google-client-secret",
	trustedOrigins:     [TEST_FRONTEND_URL, TEST_BACKEND_URL],
}));

// ─── Express ─────────────────────────────────────────────────────────────────

const app = express();

app.use(cors({ origin: TEST_FRONTEND_URL, credentials: true }));

// Playwright webServer health-check endpoint
app.get("/api/auth/ok", (_req, res) => { res.send("ok"); });

app.all("/api/auth/{*any}", toNodeHandler(auth));

// ─── Test helpers (better-auth testUtils plugin, exposed over HTTP) ───────────
//
// Playwright tests run in a separate process from this server, so they can't
// access `auth.$context.test` directly. We expose a tiny internal HTTP API that
// wraps the test helpers (createUser/saveUser/getCookies/deleteUser).
//
// `express.json()` is intentionally registered AFTER `toNodeHandler(auth)` so
// it does not consume the raw body of /api/auth/* requests.

const authCtx = await auth.$context;
const testHelpers = (authCtx as typeof authCtx & { test: TestHelpers }).test;

app.use(express.json());

app.post("/test/login", async (req, res) => {
	const overrides = req.body ?? {};
	const user = testHelpers.createUser(overrides);
	await testHelpers.saveUser(user);
	const cookies = await testHelpers.getCookies({
		userId: user.id,
		domain: "localhost",
	});
	res.json({ user, cookies });
});

app.post("/test/delete-user", async (req, res) => {
	await testHelpers.deleteUser(req.body.userId);
	res.json({ ok: true });
});

app.listen(TEST_BACKEND_PORT, () => {
	console.log(`[test-server] ready at ${TEST_BACKEND_URL}`);
});

// ─── Graceful shutdown ────────────────────────────────────────────────────────

const shutdown = async () => {
	mswServer.close();
	await mongoClient.close();
	if (mongod) {
		await mongod.stop();
	}
	process.exit(0);
};

process.on("SIGTERM", shutdown);
process.on("SIGINT",  shutdown);
