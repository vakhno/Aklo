import type { Express } from "express";

import { initAuthServer, mongodbAdapter, toNodeHandler } from "@shared/auth/server";
import { getMongoClient } from "@shared/mongo";

interface InitAuthProps {
	app: Express;
}

export const initAuth = ({ app }: InitAuthProps) => {
	const mongoClient = getMongoClient();
	const serverAuthConfig = initAuthServer({ options: {
		basePath: "/api/auth",
		database: mongodbAdapter(mongoClient.db(), { client: mongoClient }),
		// baseUrl: process.env.VITE_API_URL || "",
		baseUrl: process.env.VITE_APP_URL || "",
		secret: process.env.BETTER_AUTH_SECRET || "",
		googleClientId: process.env.GOOGLE_AUTH_CLIENT_ID || "",
		googleClientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET || "",
		trustedOrigins: [
			process.env.VITE_APP_URL,
			process.env.VITE_API_URL,
			`http://localhost:${process.env.VITE_PORT}`,
			`http://127.0.0.1:${process.env.VITE_PORT}`,
		],
	} });

	app.all("/api/auth/*splat", toNodeHandler(serverAuthConfig));
	// app.all("/api/auth/{*any}", toNodeHandler(serverAuthConfig));
};
