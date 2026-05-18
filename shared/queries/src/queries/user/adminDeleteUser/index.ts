import { useMutation, type UseMutationOptions, useQueryClient } from "@tanstack/react-query";

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

type deleteUserAdminProps = {
	apiBaseUrl: string;
	id: string;
};

const deleteUserAdmin = async ({ apiBaseUrl, id }: deleteUserAdminProps) =>
	adminUserPathFetch({ apiBaseUrl, path: `/${id}`, init: { method: "DELETE" } });

type useAdminDeleteUserProps = {
	options?: UseMutationOptions<unknown, Error, deleteUserAdminProps>;
};

export const useAdminDeleteUser = ({ options }: useAdminDeleteUserProps = {}) => {
	const queryClient = useQueryClient();
	const { onSuccess, ...restOptions } = options ?? {};
	return useMutation({
		mutationFn: deleteUserAdmin,
		...restOptions,
		onSuccess: (...args) => {
			queryClient.invalidateQueries({ queryKey: ["admin-users"] });
			onSuccess?.(...args);
		}
	});
};
