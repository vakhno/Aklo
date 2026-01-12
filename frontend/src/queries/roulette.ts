import { useInfiniteQuery, useQuery, type UseQueryOptions } from "@tanstack/react-query";

import type { LanguageType } from "@/lib/types/language";
import type { RouletteType } from "@/lib/types/roulette";

type getRouletteProps = {
	id: string;
};

const getRoulette = async ({ id }: getRouletteProps): Promise<RouletteType> => {
	const url = `${import.meta.env.VITE_SOCKET_URL}/api/roulette/${id}`;
	const response = await fetch(url, {
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
	const url = `${import.meta.env.VITE_SOCKET_URL}/api/roulette?page=${page}&limit=${limit}${language ? `&language=${language}` : ""}`;
	const response = await fetch(url, {
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
	const url = `${import.meta.env.VITE_SOCKET_URL}/api/roulette/language`;
	const response = await fetch(url, {
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
