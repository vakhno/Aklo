import { useMutation, type UseMutationOptions, useQuery, useQueryClient, type UseQueryOptions } from "@tanstack/react-query";
import { createAuthClient } from "better-auth/client";
import { adminClient } from "better-auth/client/plugins";

const API_BASE_URL = import.meta.env.VITE_SOCKET_URL || "";

export const authClient = createAuthClient({
	baseURL: `${API_BASE_URL}/api/auth`,
	fetchOptions: {
		credentials: "include"
	},
	plugins: [
		adminClient()
	]
});

export type Session = {
	session: {
		expiresAt: Date;
		token: string;
		createdAt: Date;
		updatedAt: Date;
		ipAddress: string;
	};
	user: {
		id: string;
		name: string;
		email: string;
		emailVerified: boolean;
		image?: string;
		picture?: string;
		createdAt: Date;
		role?: string;
	};
} | null;

export const loginWithGoogle = async (redirectTo?: string) => {
	const redirectPath = redirectTo ?? window.location.pathname + window.location.search;
	sessionStorage.setItem("oauth_redirect", redirectPath);

	const callbackURL = `${window.location.origin}/auth/google/callback`;
	await authClient.signIn.social({
		provider: "google",
		callbackURL
	});
};

export const getSession = async (): Promise<Session> => {
	try {
		const session = await authClient.getSession();

		if (session && typeof session === "object") {
			if ("error" in session && session.error) {
				return null;
			}
			if ("data" in session && session.data) {
				return session.data as Session;
			}
			if ("user" in session && "session" in session) {
				return session as Session;
			}
		}
		return null;
	}
	catch {
		return null;
	}
};

export const logout = async (): Promise<void> => {
	await authClient.signOut();
};

type useGetSessionProps = {
	options?: Omit<Partial<UseQueryOptions<Session, Error>>, "queryKey" | "queryFn">;
};

export const useGetSession = ({ options }: useGetSessionProps = {}) => {
	return useQuery({
		queryKey: ["session"],
		queryFn: () => getSession(),
		...options
	});
};

type useLogoutProps = {
	options?: UseMutationOptions<void, Error, void>;
};

export const useLogout = ({ options }: useLogoutProps = {}) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: logout,
		onSuccess: () => {
			queryClient.setQueryData(["session"], null);
		},
		...options
	});
};
