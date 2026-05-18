import { admin, bearer } from "better-auth/plugins";
import { ROLES_LIST, DEFAULT_USER_ROLE } from "../common/constants";
import type { ServerConfigProps } from "../types";

export const serverConfig = ({database, basePath, baseUrl, secret, googleClientId, googleClientSecret, trustedOrigins}: ServerConfigProps) => ({
	database,
	basePath,
	baseURL: baseUrl,
	secret,
	plugins: [admin(), bearer()],
	user: {
	  additionalFields: {
		role: {
		  type: [...ROLES_LIST],
		  required: true,
		  defaultValue: DEFAULT_USER_ROLE,
		  input: false,
		},
	  },
	},
	socialProviders: {
	  google: {
		clientId: googleClientId,
		clientSecret: googleClientSecret,
		prompt: "select_account" as const,
	  },
	},
	trustedOrigins,
	session: {
	  expiresIn: 30 * 60,
	  updateAge: 10 * 60,
	  cookieCache: {
		enabled: true,
		maxAge: 30 * 60,
	  },
	},
	advanced: {
	  useSecureCookies: true,
	  cookies: {
		session_token: {
		  attributes: { sameSite: "none" as const, secure: true, httpOnly: true },
		},
		session_data: {
		  attributes: { sameSite: "none" as const, secure: true, httpOnly: true },
		},
		state: {
		  attributes: { sameSite: "none" as const, secure: true, httpOnly: true },
		},
	  },
	},
  });