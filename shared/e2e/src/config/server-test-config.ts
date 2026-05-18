import { serverConfig } from "@shared/auth/server-config";
import type { ServerConfigProps } from "@shared/auth/types";
import { BetterAuthOptions } from "better-auth";
import { admin, bearer, testUtils } from "better-auth/plugins";

export const serverTestConfig = ({database, basePath, baseUrl, secret, googleClientId, googleClientSecret, trustedOrigins}: ServerConfigProps): BetterAuthOptions => {
	return {
		...serverConfig({database, basePath, baseUrl, secret, googleClientId, googleClientSecret, trustedOrigins}),
		plugins: [admin(), bearer(), testUtils()] as const,
		advanced: {
            useSecureCookies: false,
            cookies: {
                session_token: { attributes: { sameSite: "lax" as const, httpOnly: true } },
                session_data:  { attributes: { sameSite: "lax" as const, httpOnly: true } },
                state:         { attributes: { sameSite: "lax" as const, httpOnly: true } },
            },
        },
	};
}
