declare namespace NodeJS {
	interface ProcessEnv {
		PORT: string;
		VITE_APP_URL: string;
		MONGO_DB_URI: string;
		REDIS_URL: string;
		VITE_API_URL: string;
		BETTER_AUTH_SECRET: string;
		GOOGLE_AUTH_CLIENT_ID: string;
		GOOGLE_AUTH_CLIENT_SECRET: string;
	}
}
