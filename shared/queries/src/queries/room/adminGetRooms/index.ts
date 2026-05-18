import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import type { RoomDocType } from "@shared/mongo/types/room";

type getAdminRoomsProps = {
	apiBaseUrl: string;
};

const getAdminRooms = async ({ apiBaseUrl }: getAdminRoomsProps): Promise<RoomDocType[]> => {
	const response = await fetch(`${apiBaseUrl}/api/room`, {
		credentials: "include",
		headers: {
			"Content-Type": "application/json"
		}
	});

	if (!response.ok) {
		const error = await response.json().catch(() => ({ error: "Request failed" }));
		throw new Error(error.error || "Request failed");
	}

	if (response.status === 204) {
		return [];
	}

	return response.json();
};

type useAdminGetRoomsProps = getAdminRoomsProps & {
	options?: Omit<UseQueryOptions<RoomDocType[], Error>, "queryKey" | "queryFn">;
};

export const useAdminGetRooms = ({ apiBaseUrl, options }: useAdminGetRoomsProps) => {
	return useQuery({
		queryKey: ["admin-rooms", apiBaseUrl],
		queryFn: () => getAdminRooms({ apiBaseUrl }),
		...options
	});
};
