import { useMutation, type UseMutationOptions, useQueryClient } from "@tanstack/react-query";

type deleteRoomAdminProps = {
	id: string;
	apiBaseUrl: string;
};

const deleteRoomAdmin = async ({ id, apiBaseUrl }: deleteRoomAdminProps): Promise<null> => {
	const response = await fetch(`${apiBaseUrl}/api/room/${id}`, {
		method: "DELETE",
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
		return null;
	}

	return response.json();
};

type useAdminDeleteRoomProps = {
	options?: UseMutationOptions<null, Error, deleteRoomAdminProps>;
};

export const useAdminDeleteRoom = ({ options }: useAdminDeleteRoomProps = {}) => {
	const queryClient = useQueryClient();
	const { onSuccess, ...restOptions } = options ?? {};

	return useMutation({
		mutationFn: deleteRoomAdmin,
		...restOptions,
		onSuccess: (...args) => {
			queryClient.invalidateQueries({ queryKey: ["admin-rooms"] });
			onSuccess?.(...args);
		}
	});
};
