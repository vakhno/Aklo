import { clientConfig } from "./client-config";
import type { ClientConfigProps, AuthClient } from "../types";
import { createAuthClient } from "better-auth/client";

export const clientAuth = (options: ClientConfigProps): AuthClient => {
	const config = clientConfig(options);
	const authClient = createAuthClient(config);

    return authClient;
}
