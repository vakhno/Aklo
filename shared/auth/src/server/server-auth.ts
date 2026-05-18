import { betterAuth } from "better-auth";
import { serverConfig } from "./server-config";
import { AuthServer, ServerConfigProps } from "../types";

export const serverAuth = (options: ServerConfigProps): AuthServer => {
	const authServer = betterAuth({
		...serverConfig(options),
	});
    
	return authServer;
};