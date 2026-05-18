import { useMutation, type UseMutationOptions, useQueryClient } from "@tanstack/react-query";

type adminRoomPathFetchProps = {
	apiBaseUrl: string;
	path: string;
	init?: RequestInit;
};

const adminRoomPathFetch = async ({
	apiBaseUrl,
	path,
	init
}: adminRoomPathFetchProps) => {
	const response = await fetch(`${apiBaseUrl}/api/room${path}`, {
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

type removeRoomUserAdminProps = {
	apiBaseUrl: string;
	roomId: string;
	userId: string;
};

const removeRoomUserAdmin = async ({
	apiBaseUrl,
	roomId,
	userId
}: removeRoomUserAdminProps) =>
	adminRoomPathFetch({
		apiBaseUrl,
		path: `/${roomId}/users/${userId}`,
		init: { method: "DELETE" }
	});

type useAdminRemoveRoomUserProps = {
	options?: UseMutationOptions<unknown, Error, removeRoomUserAdminProps>;
};

export const useAdminRemoveRoomUser = ({
	options
}: useAdminRemoveRoomUserProps = {}) => {
	const queryClient = useQueryClient();
	const { onSuccess, ...restOptions } = options ?? {};
	return useMutation({
		mutationFn: removeRoomUserAdmin,
		...restOptions,
		onSuccess: (...args) => {
			queryClient.invalidateQueries({
				queryKey: ["admin-room-users", args[1].apiBaseUrl, args[1].roomId]
			});
			onSuccess?.(...args);
		}
	});
};
