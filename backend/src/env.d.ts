declare namespace NodeJS {
	interface ProcessEnv {
		PORT: string;
		CORS_ORIGIN: string;
		MONGO_DB_URI: string;
		REDIS_URL: string;
		BETTER_AUTH_URL: string;
		BETTER_AUTH_SECRET: string;
		GOOGLE_AUTH_CLIENT_ID: string;
		GOOGLE_AUTH_CLIENT_SECRET: string;
		GOOGLE_AUTH_REDIRECT_URI: string;
	}
}
