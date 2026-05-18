import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

type getIdListOfOwnRoomsProps = {
	apiBaseUrl: string;
};

const getIdListOfOwnRooms = async ({
	apiBaseUrl
}: getIdListOfOwnRoomsProps): Promise<string[]> => {
	const response = await fetch(`${apiBaseUrl}/api/room/own-room-ids`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		},
		credentials: "include"
	});

	if (!response.ok) {
		throw new Error("Failed to load list of ids!");
	}

	const { ids } = await response.json();

	return ids || [];
};

type useGetIdListOfOwnRoomsProps = getIdListOfOwnRoomsProps & {
	options?: Omit<UseQueryOptions<string[], Error>, "queryKey" | "queryFn">;
};

export const useGetIdListOfOwnRooms = ({
	apiBaseUrl,
	options
}: useGetIdListOfOwnRoomsProps) => {
	return useQuery({
		queryKey: ["list-of-own-rooms", apiBaseUrl],
		queryFn: () => getIdListOfOwnRooms({ apiBaseUrl }),
		...options
	});
};
