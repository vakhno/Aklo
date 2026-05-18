import { inferAdditionalFields, adminClient } from "better-auth/client/plugins";
import type { ClientConfigProps } from "../types";

export const clientConfig = ({baseURL}: ClientConfigProps) => {
	return {
		baseURL,
		fetchOptions: {
			credentials: "include" as const,
		},
		plugins: [inferAdditionalFields(), adminClient()],
	};
}
