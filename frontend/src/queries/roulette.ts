import { useInfiniteQuery, useMutation } from "@tanstack/react-query";

import type { RouletteType } from "@/lib/types/roulette";

const getRoulette = async ({ rouletteId }: { rouletteId: string }): Promise<RouletteType> => {
	const response = await fetch(`${import.meta.env.VITE_SOCKET_URL}/api/roulette/${rouletteId}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});

	const { ok } = response;

	if (!ok) {
		throw new Error("Failed to load roulette!");
	}

	const { roulette } = await response.json();

	return roulette;
};

type useGetRouletteProps = {
	onSuccess?: (roulette: RouletteType) => void;
	onError?: () => void;
};

export const useGetRoulette = ({ onSuccess, onError }: useGetRouletteProps) => {
	return useMutation({
		mutationFn: getRoulette,
		onSuccess,
		onError
	});
};

const getAllRoulettes = async ({ limit, page, language }: { limit: number; page: number; language?: string }) => {
	const response = await fetch(`${import.meta.env.VITE_SOCKET_URL}/api/roulette?page=${page}&limit=${limit}${language ? `&language=${language}` : ""}`, {
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
