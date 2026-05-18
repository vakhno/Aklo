import { useMutation, type UseMutationOptions, useQueryClient } from "@tanstack/react-query";

import type { RoomDocType } from "@shared/mongo/types/room";

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

/** Payload for PUT /api/room/:id – language is the language id (string). */
export type AdminUpdateRoomPayload = {
	title?: string;
	language?: string;
	isCameraRequired?: boolean;
	isMicRequired?: boolean;
	maxUsersCount?: number;
};

type updateRoomAdminProps = {
	apiBaseUrl: string;
	id: string;
	data: AdminUpdateRoomPayload;
};

const updateRoomAdmin = async ({
	apiBaseUrl,
	id,
	data
}: updateRoomAdminProps): Promise<RoomDocType> => {
	return adminRoomPathFetch({
		apiBaseUrl,
		path: `/${id}`,
		init: {
			method: "PUT",
			body: JSON.stringify(data)
		}
	}) as Promise<RoomDocType>;
};

type useAdminUpdateRoomProps = {
	options?: UseMutationOptions<RoomDocType, Error, updateRoomAdminProps>;
};

export const useAdminUpdateRoom = ({
	options
}: useAdminUpdateRoomProps = {}) => {
	const queryClient = useQueryClient();
	const { onSuccess, ...restOptions } = options ?? {};
	return useMutation({
		mutationFn: updateRoomAdmin,
		...restOptions,
		onSuccess: (...args) => {
			queryClient.invalidateQueries({ queryKey: ["admin-rooms"] });
			onSuccess?.(...args);
		}
	});
};
