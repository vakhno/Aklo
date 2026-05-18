import { useMutation, type UseMutationOptions, useQueryClient } from "@tanstack/react-query";

import type { RouletteDocType } from "@shared/mongo/types/roulette";

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

type createRouletteAdminProps = {
	apiBaseUrl: string;
	language: string;
	isCameraRequired: boolean;
	isMicRequired: boolean;
};

const createRouletteAdmin = async ({
	apiBaseUrl,
	language,
	isCameraRequired,
	isMicRequired
}: createRouletteAdminProps): Promise<RouletteDocType> => {
	return adminRouletteFetch({
		apiBaseUrl,
		path: "",
		init: {
			method: "POST",
			body: JSON.stringify({
				language,
				isCameraRequired,
				isMicRequired
			})
		}
	}) as Promise<RouletteDocType>;
};

type useAdminCreateRouletteProps = {
	options?: UseMutationOptions<RouletteDocType, Error, createRouletteAdminProps>;
};

export const useAdminCreateRoulette = ({
	options
}: useAdminCreateRouletteProps = {}) => {
	const queryClient = useQueryClient();
	const { onSuccess, ...restOptions } = options ?? {};
	return useMutation({
		mutationFn: createRouletteAdmin,
		...restOptions,
		onSuccess: (...args) => {
			queryClient.invalidateQueries({ queryKey: ["admin-roulettes"] });
			onSuccess?.(...args);
		}
	});
};
