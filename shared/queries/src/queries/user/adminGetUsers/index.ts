import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import type { ClientSessionUser } from "@shared/auth/types";

type adminUserPathFetchProps = {
	apiBaseUrl: string;
	path: string;
	init?: RequestInit;
};

const adminUserPathFetch = async ({
	apiBaseUrl,
	path,
	init
}: adminUserPathFetchProps) => {
	const response = await fetch(`${apiBaseUrl}/api/user${path}`, {
		...init,
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			...init?.headers
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

type getAdminUserListProps = {
	apiBaseUrl: string;
	params?: { limit?: number; offset?: number };
};

const getAdminUserList = async ({ apiBaseUrl, params }: getAdminUserListProps) => {
	const search = new URLSearchParams();
	if (params?.limit != null)
		search.set("limit", String(params.limit));
	if (params?.offset != null)
		search.set("offset", String(params.offset));
	const query = search.toString();
	return adminUserPathFetch({ apiBaseUrl, path: query ? `?${query}` : "" });
};

type useAdminGetUsersProps = getAdminUserListProps & {
	options?: Omit<UseQueryOptions<ClientSessionUser[], Error>, "queryKey" | "queryFn">;
};

export const useAdminGetUsers = ({ apiBaseUrl, options, params }: useAdminGetUsersProps) => {
	const effectiveParams = params ?? { limit: 5000, offset: 0 };
	return useQuery({
		queryKey: ["admin-users", apiBaseUrl, effectiveParams.limit, effectiveParams.offset],
		queryFn: async () => {
			const data = await getAdminUserList({ apiBaseUrl, params: effectiveParams });
			return data.users as ClientSessionUser[];
		},
		...options
	});
};
