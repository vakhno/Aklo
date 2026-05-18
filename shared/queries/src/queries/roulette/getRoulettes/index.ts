import { useInfiniteQuery } from "@tanstack/react-query";

const getAllRoulettes = async ({
	apiBaseUrl,
	limit,
	page,
	language
}: {
	apiBaseUrl: string;
	limit: number;
	page: number;
	language?: string;
}) => {
	const response = await fetch(
		`${apiBaseUrl}/api/roulette?page=${page}&limit=${limit}${language ? `&language=${language}` : ""}`,
		{
			method: "GET",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			}
		}
	);

	if (!response.ok) {
		throw new Error("Failed to load roulettes!");
	}

	const { roulettes, isHasMore } = await response.json();

	return { roulettes, isHasMore };
};

type UseGetRoulettesProps = {
	apiBaseUrl: string;
	language?: string;
	limit: number;
};

export const useGetRoulettes = ({ apiBaseUrl, language, limit }: UseGetRoulettesProps) => {
	return useInfiniteQuery({
		queryKey: ["roulettes", apiBaseUrl, language, limit],
		queryFn: ({ pageParam }) =>
			getAllRoulettes({ apiBaseUrl, page: pageParam as number, limit, language }),
		getNextPageParam: (lastPage, _, lastPageParam) =>
			lastPage?.isHasMore ? (lastPageParam as number) + 1 : undefined,
		initialPageParam: 1
	});
};
