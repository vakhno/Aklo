import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

import { getMongoClient } from "../db/index.js";

const client = getMongoClient();
const db = client.db();

export const auth = betterAuth({
	database: mongodbAdapter(db, {
		client,
	}),
	basePath: "/api/auth",
	baseURL: process.env.BETTER_AUTH_URL || "",
	secret: process.env.BETTER_AUTH_SECRET || "",
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_AUTH_CLIENT_ID || "",
			clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET || "",
			redirectURI: process.env.GOOGLE_AUTH_REDIRECT_URI || "",
			prompt: "select_account",
		},
	},
	trustedOrigins: [
		process.env.CORS_ORIGIN || "",
		process.env.BETTER_AUTH_URL || "",
	],
	session: {
		expiresIn: 30 * 60,
		updateAge: 10 * 60,
	},
	cookieCache: {
		enabled: true,
		maxAge: 30 * 60,
	},
	advanced: {
		useSecureCookies: true,
		cookies: {
			session_token: {
				attributes: {
					sameSite: "none",
					secure: true,
					httpOnly: true,
				},
			},
			session_data: {
				attributes: {
					sameSite: "none",
					secure: true,
					httpOnly: true,
				},
			},
		},
	},
});
