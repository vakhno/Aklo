import { useMutation, type UseMutationOptions, useQueryClient } from "@tanstack/react-query";

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

export type AdminUpdateUserPayload = {
	name?: string;
	email?: string;
	image?: string;
	role?: string;
};

type updateUserAdminProps = {
	apiBaseUrl: string;
	id: string;
	data: AdminUpdateUserPayload;
};

const updateUserAdmin = async ({
	apiBaseUrl,
	id,
	data
}: updateUserAdminProps): Promise<ClientSessionUser> =>
	adminUserPathFetch({
		apiBaseUrl,
		path: `/${id}`,
		init: {
			method: "PUT",
			body: JSON.stringify(data)
		}
	}) as Promise<ClientSessionUser>;

type useAdminUpdateUserProps = {
	options?: UseMutationOptions<ClientSessionUser, Error, updateUserAdminProps>;
};

export const useAdminUpdateUser = ({ options }: useAdminUpdateUserProps = {}) => {
	const queryClient = useQueryClient();
	const { onSuccess, ...restOptions } = options ?? {};
	return useMutation({
		mutationFn: updateUserAdmin,
		...restOptions,
		onSuccess: (...args) => {
			queryClient.invalidateQueries({ queryKey: ["admin-users"] });
			onSuccess?.(...args);
		}
	});
};
