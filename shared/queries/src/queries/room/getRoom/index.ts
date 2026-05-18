import type { RoomDocLeanPopulatedType } from "@shared/mongo/types/room";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

type getRoomProps = {
	apiBaseUrl: string;
	id: string;
};

const getRoom = async ({ apiBaseUrl, id }: getRoomProps): Promise<RoomDocLeanPopulatedType> => {
	const response = await fetch(`${apiBaseUrl}/api/room/${id}`, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json"
		}
	});

	if (!response.ok) {
		throw new Error("Failed to load room!");
	}

	return response.json();
};

type useGetRoomProps = getRoomProps & {
	options?: Omit<UseQueryOptions<RoomDocLeanPopulatedType, Error>, "queryKey" | "queryFn">;
};

export const useGetRoom = ({ apiBaseUrl, id, options }: useGetRoomProps) => {
	return useQuery({
		queryKey: ["room", apiBaseUrl, id],
		queryFn: () => getRoom({ apiBaseUrl, id }),
		...options
	});
};
