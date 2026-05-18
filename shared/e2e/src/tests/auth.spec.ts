import { test, expect } from "@playwright/test";
import { MongoClient, Db } from "mongodb";
import { ROUTES } from "@shared/routes/constants";

// ─── Constants ────────────────────────────────────────────────────────────────

const BACKEND_URL          = "http://localhost:3001";
const MONGO_URI            = "mongodb://127.0.0.1:27018";
const NEW_USER_CALLBACK_URL = ROUTES.PROFILE.path;

const FAKE_GOOGLE_USER = {
	email: "testuser@gmail.com",
	name:  "Test User",
};

// ─── DB connection (to the in-memory MongoDB started by test-server) ──────────

let client: MongoClient;
let db: Db;

test.beforeAll(async () => {
	client = new MongoClient(MONGO_URI);
	await client.connect();
	db = client.db("better-auth-test");
});

test.afterAll(async () => {
	await client.close();
});

test.beforeEach(async () => {
	const collections = await db.listCollections().toArray();
	for (const col of collections) {
		await db.collection(col.name).deleteMany({});
	}
});

test.describe("Google OAuth", () => {
	test.describe("Login page", () => {
		test("renders Google sign-in button", async ({ page }) => {
			await page.goto("/auth/login");
			await expect(page.getByRole("button", { name: /Sign in with Google/i })).toBeVisible();
			await expect(page.getByRole("button", { name: /Sign in with Google/i })).toBeEnabled();
		});
	});

	test.describe("Redirect to Google", () => {
		test("clicking sign-in redirects to accounts.google.com", async ({ page }) => {
			await page.goto("/auth/login");
			await page.getByRole("button", { name: /Sign in with Google/i }).click();
			await expect(page).toHaveURL(/accounts\.google\.com/);
		});
	});

	test.describe("Authenticated session", () => {
		test("authenticated user lands on profile page", async ({ page, context, request }) => {
			const res = await request.post(`${BACKEND_URL}/test/login`, {
				data: { email: FAKE_GOOGLE_USER.email, name: FAKE_GOOGLE_USER.name },
			});
			expect(res.ok()).toBe(true);
			const { cookies } = await res.json();
			await context.addCookies(cookies);

			await page.goto(NEW_USER_CALLBACK_URL);
			await expect(page).toHaveURL(new RegExp(`${NEW_USER_CALLBACK_URL}$`));
		});

		test("user document is created in DB", async ({ request }) => {
			const res = await request.post(`${BACKEND_URL}/test/login`, {
				data: { email: FAKE_GOOGLE_USER.email, name: FAKE_GOOGLE_USER.name },
			});
			expect(res.ok()).toBe(true);

			const dbUser = await db.collection("user").findOne({ email: FAKE_GOOGLE_USER.email });
			expect(dbUser).not.toBeNull();
			expect(dbUser?.email).toBe(FAKE_GOOGLE_USER.email);
			expect(dbUser?.name).toBe(FAKE_GOOGLE_USER.name);
		});
	});

});
