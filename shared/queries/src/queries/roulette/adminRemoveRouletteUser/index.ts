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

type removeRouletteUserProps = {
	apiBaseUrl: string;
	rouletteId: string;
	userId: string;
};

const removeRouletteUser = async ({
	apiBaseUrl,
	rouletteId,
	userId
}: removeRouletteUserProps) => {
	await adminRouletteFetch({
		apiBaseUrl,
		path: `/${rouletteId}/users/${userId}`,
		init: { method: "DELETE" }
	});
};

type useAdminRemoveRouletteUserProps = {
	options?: UseMutationOptions<unknown, Error, removeRouletteUserProps>;
};

export const useAdminRemoveRouletteUser = ({
	options
}: useAdminRemoveRouletteUserProps = {}) => {
	const queryClient = useQueryClient();
	const { onSuccess, ...restOptions } = options ?? {};
	return useMutation({
		mutationFn: removeRouletteUser,
		...restOptions,
		onSuccess: (...args) => {
			queryClient.invalidateQueries({
				queryKey: ["admin-roulette-users", args[1].apiBaseUrl, args[1].rouletteId]
			});
			onSuccess?.(...args);
		}
	});
};
