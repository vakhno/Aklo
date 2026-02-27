import { useMutation, type UseMutationOptions, useQuery, useQueryClient, type UseQueryOptions } from "@tanstack/react-query";

import type { ListUsersResponse, UserType } from "@/lib/types/user";

const API_URL = `${import.meta.env.VITE_SOCKET_URL}/api/user`;

const adminUserFetch = async (url: string, options?: RequestInit) => {
	const response = await fetch(`${API_URL}${url}`, {
		...options,
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			...options?.headers
		}
	});

	if (!response.ok) {
		const error = await response.json().catch(() => ({ error: "Request failed" }));
		throw new Error(error.error || "Request failed");
	}

	if (response.status === 204) {
		return null;
	}

	return response.json();
};

export const getAdminUserList = async (params?: { limit?: number; offset?: number }): Promise<ListUsersResponse> => {
	const search = new URLSearchParams();
	if (params?.limit != null)
		search.set("limit", String(params.limit));
	if (params?.offset != null)
		search.set("offset", String(params.offset));
	const query = search.toString();
	return adminUserFetch(query ? `?${query}` : "") as Promise<ListUsersResponse>;
};

export const useAdminGetUsers = ({
	options,
	params
}: {
	options?: Partial<UseQueryOptions<UserType[], Error>>;
	params?: { limit?: number; offset?: number };
} = {}) => {
	return useQuery({
		queryKey: ["admin-users", params?.limit, params?.offset],
		queryFn: async () => {
			const data = await getAdminUserList(params ?? { limit: 5000, offset: 0 });
			return data.users as UserType[];
		},
		...options
	});
};

export type AdminUpdateUserPayload = {
	name?: string;
	email?: string;
	image?: string;
	role?: string;
};

export const useAdminUpdateUser = ({
	options
}: {
	options?: UseMutationOptions<UserType, Error, { id: string; data: AdminUpdateUserPayload }>;
} = {}) => {
	const queryClient = useQueryClient();
	const { onSuccess, ...restOptions } = options ?? {};
	return useMutation({
		mutationFn: async ({ id, data }: { id: string; data: AdminUpdateUserPayload }) => {
			const result = await adminUserFetch(`/${id}`, {
				method: "PUT",
				body: JSON.stringify(data)
			});
			return result as UserType;
		},
		...restOptions,
		onSuccess: (...args) => {
			queryClient.invalidateQueries({ queryKey: ["admin-users"] });
			onSuccess?.(...args);
		}
	});
};

export const useAdminDeleteUser = ({
	options
}: {
	options?: UseMutationOptions<unknown, Error, string>;
} = {}) => {
	const queryClient = useQueryClient();
	const { onSuccess, ...restOptions } = options ?? {};
	return useMutation({
		mutationFn: (id: string) => adminUserFetch(`/${id}`, { method: "DELETE" }),
		...restOptions,
		onSuccess: (...args) => {
			queryClient.invalidateQueries({ queryKey: ["admin-users"] });
			onSuccess?.(...args);
		}
	});
};
