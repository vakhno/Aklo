import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import type { RouletteDocLeanPopulatedType } from "@shared/mongo/types/roulette";

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

type getAdminRoulettesProps = {
	apiBaseUrl: string;
};

const getAdminRoulettes = async ({
	apiBaseUrl
}: getAdminRoulettesProps): Promise<RouletteDocLeanPopulatedType[]> => {
	const data = await adminRouletteFetch({ apiBaseUrl, path: "" });
	return data.roulettes as RouletteDocLeanPopulatedType[];
};

type useAdminGetRoulettesProps = getAdminRoulettesProps & {
	options?: Omit<UseQueryOptions<RouletteDocLeanPopulatedType[], Error>, "queryKey" | "queryFn">;
};

export const useAdminGetRoulettes = ({ apiBaseUrl, options }: useAdminGetRoulettesProps) => {
	return useQuery({
		queryKey: ["admin-roulettes", apiBaseUrl],
		queryFn: () => getAdminRoulettes({ apiBaseUrl }),
		...options
	});
};
