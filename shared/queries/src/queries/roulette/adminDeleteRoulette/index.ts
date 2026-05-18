import { useMutation, type UseMutationOptions, useQueryClient } from "@tanstack/react-query";

type adminRouletteFetchProps = {
	apiBaseUrl: string;
	path: string;
	init?: RequestInit;
};

const adminRouletteFetch = async ({
	apiBaseUrl,
	path,
	init
}: adminRouletteFetchProps) => {
	const response = await fetch(`${apiBaseUrl}/api/roulette${path}`, {
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

type deleteRouletteAdminProps = {
	apiBaseUrl: string;
	id: string;
};

const deleteRouletteAdmin = async ({ apiBaseUrl, id }: deleteRouletteAdminProps): Promise<null> => {
	return adminRouletteFetch({
		apiBaseUrl,
		path: `/${id}`,
		init: { method: "DELETE" }
	}) as Promise<null>;
};

type useAdminDeleteRouletteProps = {
	options?: UseMutationOptions<null, Error, deleteRouletteAdminProps>;
};

export const useAdminDeleteRoulette = ({
	options
}: useAdminDeleteRouletteProps = {}) => {
	const queryClient = useQueryClient();
	const { onSuccess, ...restOptions } = options ?? {};
	return useMutation({
		mutationFn: deleteRouletteAdmin,
		...restOptions,
		onSuccess: (...args) => {
			queryClient.invalidateQueries({ queryKey: ["admin-roulettes"] });
			onSuccess?.(...args);
		}
	});
};
