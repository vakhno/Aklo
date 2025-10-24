import { useMutation, useQuery } from "@tanstack/react-query";

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

const getAllRoulettes = async (): Promise<RouletteType[]> => {
	const response = await fetch(`${import.meta.env.VITE_SOCKET_URL}/api/roulette`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});

	const { ok } = response;

	if (!ok) {
		throw new Error("Failed to load roulettes!");
	}

	const { roulettes } = await response.json();

	return roulettes;
};

export const useGetAllRoulettes = () => {
	return useQuery({
		queryKey: ["roulettes"],
		queryFn: getAllRoulettes
	});
};
