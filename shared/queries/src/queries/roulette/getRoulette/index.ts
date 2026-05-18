import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import type { RouletteDocLeanPopulatedType } from "@shared/mongo/types/roulette";

type getRouletteProps = {
	apiBaseUrl: string;
	id: string;
};

const getRoulette = async ({
	apiBaseUrl,
	id
}: getRouletteProps): Promise<RouletteDocLeanPopulatedType> => {
	const response = await fetch(`${apiBaseUrl}/api/roulette/${id}`, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json"
		}
	});

	if (!response.ok) {
		throw new Error("Failed to load roulette!");
	}

	return response.json();
};

type useGetRouletteProps = getRouletteProps & {
	options?: Omit<UseQueryOptions<RouletteDocLeanPopulatedType, Error>, "queryKey" | "queryFn">;
};

export const useGetRoulette = ({ apiBaseUrl, id, options }: useGetRouletteProps) => {
	return useQuery({
		queryKey: ["roulette", apiBaseUrl, id],
		queryFn: () => getRoulette({ apiBaseUrl, id }),
		...options
	});
};
