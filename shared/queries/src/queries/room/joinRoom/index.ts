import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

type joinRoomProps = {
	apiBaseUrl: string;
	roomId: string;
};

const joinRoom = async ({ apiBaseUrl, roomId }: joinRoomProps): Promise<void> => {
	const response = await fetch(`${apiBaseUrl}/api/room/${roomId}/join`, {
		method: "POST",
		credentials: "include"
	});

	if (!response.ok) {
		throw new Error("Failed to join room!");
	}
};

type useJoinRoomProps = {
	options?: UseMutationOptions<void, Error, joinRoomProps>;
};

export const useJoinRoom = ({ options }: useJoinRoomProps = {}) => {
	return useMutation({
		mutationFn: joinRoom,
		...options
	});
};
