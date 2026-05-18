// import type { Session } from "@shared/auth";
import { getAuthClient, getClientSession, logout, socialSignIn } from "@shared/auth/client";
import { mutationOptions, queryOptions } from "@tanstack/react-query";

import type { ClientSession } from "@shared/auth/types";

export const authQueryKeys = {
	session: ["session"] as const
};

const getSessionQueryFn = async () => {
	const client = getAuthClient();
	const session = await getClientSession({ client });
	return session;
};

export const getSessionQueryOptions = () =>
	queryOptions<ClientSession | null, Error>({
		queryKey: authQueryKeys.session,
		queryFn: getSessionQueryFn
	});

const logoutMutationFn = async () => {
	const client = getAuthClient();
	await logout({ client });
};

export const logoutMutationOptions = () =>
	mutationOptions<void, Error, void>({
		mutationFn: logoutMutationFn
	});

export const loginWithGoogleMutationOptions = () =>
	mutationOptions<void, Error, void>({
		mutationFn: async () => {
			const client = getAuthClient();
			await socialSignIn({ client, options: { provider: "google" } });
		}
	});
