import { useInfiniteQuery } from "@tanstack/react-query";

const getAllRooms = async ({
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
		`${apiBaseUrl}/api/room?page=${page}&limit=${limit}${language ? `&language=${language}` : ""}`,
		{
			method: "GET",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			}
		}
	);

	if (!response.ok) {
		throw new Error("Failed to load rooms!");
	}

	const { rooms, isHasMore } = await response.json();

	return { rooms, isHasMore };
};

type UseGetRoomsProps = {
	apiBaseUrl: string;
	language?: string;
	limit: number;
};

export const useGetRooms = ({ apiBaseUrl, language, limit }: UseGetRoomsProps) => {
	return useInfiniteQuery({
		queryKey: ["rooms", apiBaseUrl, language, limit],
		queryFn: ({ pageParam }) =>
			getAllRooms({ apiBaseUrl, page: pageParam as number, limit, language }),
		getNextPageParam: (lastPage, _, lastPageParam) =>
			lastPage?.isHasMore ? (lastPageParam as number) + 1 : undefined,
		initialPageParam: 1
	});
};
