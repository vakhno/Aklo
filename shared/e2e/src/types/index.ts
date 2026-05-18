import { betterAuth } from "better-auth";
import { serverTestConfig } from "../config/server-test-config";

// auth test types
const defaultTestServerConfig = serverTestConfig({basePath: "", database: {}, baseUrl: "", secret: "", googleClientId: "", googleClientSecret: "", trustedOrigins: []});
export type TestAuthServer = ReturnType<typeof betterAuth<typeof defaultTestServerConfig>>;
