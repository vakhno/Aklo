import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

type deleteRoomProps = {
	id: string;
	apiBaseUrl: string;
};

const deleteRoom = async ({ id, apiBaseUrl }: deleteRoomProps): Promise<boolean> => {
	const response = await fetch(`${apiBaseUrl}/api/room/${id}`, {
		method: "DELETE",
		credentials: "include"
	});

	if (!response.ok) {
		throw new Error("Failed to delete a room!");
	}

	return true;
};

type useDeleteRoomProps = {
	options?: UseMutationOptions<boolean, Error, deleteRoomProps>;
};

export const useDeleteRoom = ({ options }: useDeleteRoomProps = {}) => {
	return useMutation({
		mutationFn: deleteRoom,
		...options
	});
};
