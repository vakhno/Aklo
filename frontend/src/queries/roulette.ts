import { useInfiniteQuery, useMutation, type UseMutationOptions, useQuery, useQueryClient, type UseQueryOptions } from "@tanstack/react-query";

import type { LanguageType } from "@/lib/types/language";
import type { RouletteType } from "@/lib/types/roulette";

const API_URL = `${import.meta.env.VITE_SOCKET_URL}/api/roulette`;

type getRouletteProps = {
	id: string;
};

const getRoulette = async ({ id }: getRouletteProps): Promise<RouletteType> => {
	const response = await fetch(`${API_URL}/${id}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});
	const { ok } = response;

	if (!ok) {
		throw new Error("Failed to load roulette!");
	}

	const roulette = await response.json();

	return roulette;
};

type useGetRouletteProps = {
	id: string;
	options?: Partial<UseQueryOptions<RouletteType, Error>>;
};

export const useGetRoulette = ({ id, options }: useGetRouletteProps) => {
	return useQuery({
		queryKey: ["roulette"],
		queryFn: () => getRoulette({ id }),
		...options
	});
};

const getAllRoulettes = async ({ limit, page, language }: { limit: number; page: number; language?: string }) => {
	const response = await fetch(`${API_URL}?page=${page}&limit=${limit}${language ? `&language=${language}` : ""}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});
	const { ok } = response;

	if (!ok) {
		throw new Error("Failed to load roulettes!");
	}

	const { roulettes, isHasMore } = await response.json();

	return { roulettes, isHasMore };
};

type UseGetRoulettesProps = {
	language?: string;
	limit: number;
};

export const useGetRoulettes = ({ language, limit }: UseGetRoulettesProps) => {
	return useInfiniteQuery({
		queryKey: ["roulettes", language, limit],
		queryFn: ({ pageParam }) => getAllRoulettes({ page: pageParam, limit, language }),
		getNextPageParam: (lastPage, _, lastPageParam, __) => (lastPage ? (lastPage.isHasMore ? lastPageParam + 1 : undefined) : undefined),
		initialPageParam: 1
	});
};

const getRoulettesLanguages = async (): Promise<LanguageType[]> => {
	const response = await fetch(`${API_URL}/language`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});
	const { ok } = response;

	if (!ok) {
		throw new Error("Failed to load list of used roulette languages!");
	}

	const rouletteLanguageList = await response.json() as LanguageType[];

	return rouletteLanguageList;
};

type useGetRoulettesLanguagesProps = {
	options?: UseQueryOptions<LanguageType[], Error>;
};

export const useGetRoulettesLanguages = ({ options }: useGetRoulettesLanguagesProps = {}) => {
	return useQuery({
		queryKey: ["roulette-languages"],
		queryFn: getRoulettesLanguages,
		...options
	});
};

const adminRouletteFetch = async (url: string, options?: RequestInit) => {
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

export const useAdminGetRoulettes = ({ options }: { options?: Partial<UseQueryOptions<RouletteType[], Error>> } = {}) => {
	return useQuery({
		queryKey: ["admin-roulettes"],
		queryFn: async () => {
			// Request all roulettes (backend defaults to limit=10 when no params are sent)
			const data = await adminRouletteFetch("");
			return data.roulettes as RouletteType[];
		},
		...options
	});
};

export const useAdminCreateRoulette = ({ options }: { options?: UseMutationOptions<RouletteType, Error, { language: string; isCameraRequired: boolean; isMicRequired: boolean }> } = {}) => {
	const queryClient = useQueryClient();
	const { onSuccess, ...restOptions } = options ?? {};
	return useMutation({
		mutationFn: (data: { language: string; isCameraRequired: boolean; isMicRequired: boolean }) => adminRouletteFetch("", { method: "POST", body: JSON.stringify(data) }),
		...restOptions,
		onSuccess: (...args) => {
			queryClient.invalidateQueries({ queryKey: ["admin-roulettes"] });
			onSuccess?.(...args);
		}
	});
};

/** Payload for PUT /api/roulette/:id – language is the language id (string). */
export type AdminUpdateRoulettePayload = {
	language?: string;
	isCameraRequired?: boolean;
	isMicRequired?: boolean;
	priority?: number;
};

export const useAdminUpdateRoulette = ({ options }: { options?: UseMutationOptions<RouletteType, Error, { id: string; data: AdminUpdateRoulettePayload }> } = {}) => {
	const queryClient = useQueryClient();
	const { onSuccess, ...restOptions } = options ?? {};
	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: AdminUpdateRoulettePayload }) => adminRouletteFetch(`/${id}`, { method: "PUT", body: JSON.stringify(data) }),
		...restOptions,
		onSuccess: (...args) => {
			queryClient.invalidateQueries({ queryKey: ["admin-roulettes"] });
			onSuccess?.(...args);
		}
	});
};

export const useAdminDeleteRoulette = ({ options }: { options?: UseMutationOptions<null, Error, string> } = {}) => {
	const queryClient = useQueryClient();
	const { onSuccess, ...restOptions } = options ?? {};
	return useMutation({
		mutationFn: (id: string) => adminRouletteFetch(`/${id}`, { method: "DELETE" }),
		...restOptions,
		onSuccess: (...args) => {
			queryClient.invalidateQueries({ queryKey: ["admin-roulettes"] });
			onSuccess?.(...args);
		}
	});
};

export const useAdminGetRouletteUsers = ({ id, options }: { id: string; options?: Partial<UseQueryOptions<{ users: string[] }, Error>> }) => {
	return useQuery({
		queryKey: ["admin-roulette-users", id],
		queryFn: () => adminRouletteFetch(`/${id}/users`),
		...options
	});
};

export const useAdminRemoveRouletteUser = ({ options }: { options?: UseMutationOptions<unknown, Error, { rouletteId: string; userId: string }> } = {}) => {
	const queryClient = useQueryClient();
	const { onSuccess, ...restOptions } = options ?? {};
	return useMutation({
		mutationFn: ({ rouletteId, userId }: { rouletteId: string; userId: string }) => adminRouletteFetch(`/${rouletteId}/users/${userId}`, { method: "DELETE" }),
		...restOptions,
		onSuccess: (...args) => {
			queryClient.invalidateQueries({ queryKey: ["admin-roulette-users"] });
			onSuccess?.(...args);
		}
	});
};
