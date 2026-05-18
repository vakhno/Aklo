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

/** Payload for PUT /api/roulette/:id – language is the language id (string). */
export type AdminUpdateRoulettePayload = {
	language?: string;
	isCameraRequired?: boolean;
	isMicRequired?: boolean;
	priority?: number;
};

type updateRouletteAdminProps = {
	apiBaseUrl: string;
	id: string;
	data: AdminUpdateRoulettePayload;
};

const updateRouletteAdmin = async ({
	apiBaseUrl,
	id,
	data
}: updateRouletteAdminProps): Promise<RouletteDocType> => {
	return adminRouletteFetch({
		apiBaseUrl,
		path: `/${id}`,
		init: {
			method: "PUT",
			body: JSON.stringify(data)
		}
	}) as Promise<RouletteDocType>;
};

type useAdminUpdateRouletteProps = {
	options?: UseMutationOptions<RouletteDocType, Error, updateRouletteAdminProps>;
};

export const useAdminUpdateRoulette = ({
	options
}: useAdminUpdateRouletteProps = {}) => {
	const queryClient = useQueryClient();
	const { onSuccess, ...restOptions } = options ?? {};
	return useMutation({
		mutationFn: updateRouletteAdmin,
		...restOptions,
		onSuccess: (...args) => {
			queryClient.invalidateQueries({ queryKey: ["admin-roulettes"] });
			onSuccess?.(...args);
		}
	});
};
