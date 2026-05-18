import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { RoomDocType } from "@shared/mongo/types/room";
import type { RoomInputSchemaType } from "@shared/schemas/room";
import { getAuthClient, getClientSessionSession } from "@shared/auth/client";

type createRoomProps = {
	apiBaseUrl: string;
	newRoomData: RoomInputSchemaType;
};

const createRoom = async ({ apiBaseUrl, newRoomData }: createRoomProps): Promise<RoomDocType> => {
	const client = getAuthClient();
	const session = await getClientSessionSession({ client });
	
	if (!session) {
		throw new Error("Unauthorized");
	}

	const { token } = session;

	if (!token) {
		throw new Error("Unauthorized");
	}

	const response = await fetch(`${apiBaseUrl}/api/room`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`
		},
		credentials: "include",
		body: JSON.stringify(newRoomData)
	});

	if (!response.ok) {
		throw new Error("Failed to create a room!");
	}

	return response.json();
};

type useCreateRoomProps = {
	options?: UseMutationOptions<RoomDocType, Error, createRoomProps>;
};

export const useCreateRoom = ({ options }: useCreateRoomProps = {}) => {
	return useMutation({
		mutationFn: createRoom,
		...options
	});
};
