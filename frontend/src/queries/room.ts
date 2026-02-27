import { useInfiniteQuery, useMutation, type UseMutationOptions, useQuery, useQueryClient, type UseQueryOptions } from "@tanstack/react-query";

import type { LanguageType } from "@/lib/types/language";
import type { NewRoomSchemaType, RoomType } from "@/lib/types/room";

const API_URL = `${import.meta.env.VITE_SOCKET_URL}/api/room`;

type getRoomProps = {
	id: string;
};

const getRoom = async ({ id }: getRoomProps): Promise<RoomType> => {
	const response = await fetch(`${API_URL}/${id}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});

	const { ok } = response;

	if (!ok) {
		throw new Error("Failed to load room!");
	}

	const room = await response.json();

	await new Promise(resolve => setTimeout(resolve, 2000));

	return room;
};

type useGetRoomProps = {
	id: string;
	options?: Partial<UseQueryOptions<RoomType, Error>>;
};

export const useGetRoom = ({ id, options }: useGetRoomProps) => {
	return useQuery({
		queryKey: ["room", id],
		queryFn: () => getRoom({ id }),
		...options
	});
};

type getUseIsAvailableToVisitProps = {
	id: string;
};

const getIsAvailableToVisit = async ({ id }: getUseIsAvailableToVisitProps): Promise<boolean> => {
	const response = await fetch(`${API_URL}/${id}/is-available-to-visit`, {
		method: "GET",
		credentials: "include"
	});

	const { ok } = response;

	if (!ok) {
		throw new Error("Room is unavailable to visit!");
	}

	return true;
};

type useIsAvailableToVisitProps = {
	id: string;
	options?: Partial<UseQueryOptions<boolean, Error>>;
};

export const useIsAvailableToVisit = ({ id, options }: useIsAvailableToVisitProps) => {
	return useQuery({
		queryKey: ["is-available-to-visit", id],
		queryFn: () => getIsAvailableToVisit({ id }),
		...options
	});
};

type createRoomProps = {
	newRoomData: NewRoomSchemaType;
};

const createRoom = async ({ newRoomData }: createRoomProps): Promise<RoomType> => {
	const response = await fetch(API_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		credentials: "include",
		body: JSON.stringify(newRoomData)
	});

	const { ok } = response;

	if (!ok) {
		throw new Error("Failed to create a room!");
	}

	const room = await response.json();

	return room;
};

type useCreateRoomProps = {
	options?: UseMutationOptions<RoomType, Error, createRoomProps>;
};

export const useCreateRoom = ({ options }: useCreateRoomProps) => {
	return useMutation({
		mutationFn: createRoom,
		...options
	});
};

type deleteRoomProps = {
	id: string;
};

const deleteRoom = async ({ id }: deleteRoomProps): Promise<boolean> => {
	const response = await fetch(`${API_URL}/${id}`, {
		method: "DELETE",
		credentials: "include"
	});

	const { ok } = response;

	if (!ok) {
		throw new Error("Failed to delete a room!");
	}

	return true;
};

type useDeleteRoomProps = {
	options?: UseMutationOptions<boolean, Error, deleteRoomProps>;
};

export const useDeleteRoom = ({ options }: useDeleteRoomProps) => {
	return useMutation({
		mutationFn: deleteRoom,
		...options
	});
};

const getAllRooms = async ({ limit, page, language }: { limit: number; page: number; language?: string }) => {
	const response = await fetch(`${API_URL}?page=${page}&limit=${limit}${language ? `&language=${language}` : ""}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});

	const { ok } = response;

	if (!ok) {
		throw new Error("Failed to load rooms!");
	}

	const { rooms, isHasMore } = await response.json();

	return { rooms, isHasMore };
};

type UseGetRoomsProps = {
	language?: string;
	limit: number;
};

export const useGetRooms = ({ language, limit }: UseGetRoomsProps) => {
	return useInfiniteQuery({
		queryKey: ["rooms", language, limit],
		queryFn: ({ pageParam }) => getAllRooms({ page: pageParam, limit, language }),
		getNextPageParam: (lastPage, _, lastPageParam, __) => (lastPage ? (lastPage.isHasMore ? lastPageParam + 1 : undefined) : undefined),
		initialPageParam: 1
	});
};

const joinRoom = async ({ roomId }: { roomId: string }): Promise<void> => {
	const response = await fetch(`${API_URL}/${roomId}/join`, {
		method: "POST"

	});
	const { ok } = response;

	if (!ok) {
		throw new Error("Failed to join room!");
	}
};

type useJoinRoomProps = {
	onSuccess?: () => void;
	onError?: () => void;
};

export const useJoinRoom = ({ onSuccess, onError }: useJoinRoomProps) => {
	return useMutation({
		mutationFn: joinRoom,
		onSuccess,
		onError
	});
};

type checkIsCreatorProps = {
	id: string;
};

const checkIsCreator = async ({ id }: checkIsCreatorProps): Promise<boolean> => {
	const response = await fetch(`${API_URL}/${id}/is-creator`, {
		method: "GET",
		credentials: "include"
	});

	const { ok } = response;

	if (!ok) {
		throw new Error("Failed to check is creator!");
	}

	const { isCreator } = await response.json();

	return isCreator;
};

type useCheckIsCreatorProps = {
	id: string;
	options?: Partial<UseQueryOptions<boolean, Error>>;
};

export const useCheckIsCreator = ({ id, options }: useCheckIsCreatorProps) => {
	return useQuery({
		queryKey: ["is-creator", id],
		queryFn: () => checkIsCreator({ id }),
		...options
	});
};

const getIdListOfOwnRooms = async (): Promise<string[]> => {
	const response = await fetch(`${API_URL}/own-room-ids`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		},
		credentials: "include"
	});

	const { ok } = response;

	if (!ok) {
		throw new Error("Failed to load list of ids!");
	}

	const { ids } = await response.json();

	return ids || [];
};

type useGetIdListOfOwnRoomsProps = {
	options?: UseQueryOptions<string[], Error>;
};

export const useGetIdListOfOwnRooms = ({ options }: useGetIdListOfOwnRoomsProps) => {
	return useQuery({
		queryKey: ["list-of-own-rooms"],
		queryFn: () => getIdListOfOwnRooms(),
		...options
	});
};

const getRoomsLanguages = async (): Promise<LanguageType[]> => {
	const response = await fetch(`${API_URL}/language`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});
	const { ok } = response;

	if (!ok) {
		throw new Error("Failed to load list of used room languages!");
	}

	const roomLanguageList = await response.json() as LanguageType[];

	return roomLanguageList;
};

type useGetRoomsLanguagesProps = {
	options?: UseQueryOptions<LanguageType[], Error>;
};

export const useGetRoomsLanguages = ({ options }: useGetRoomsLanguagesProps = {}) => {
	return useQuery({
		queryKey: ["room-languages"],
		queryFn: getRoomsLanguages,
		...options
	});
};

const adminRoomFetch = async (url: string, options?: RequestInit) => {
	const response = await fetch(`${API_URL}${url}`, {
		...options,
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			...options?.headers
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

export const useAdminGetRooms = ({ options }: { options?: Partial<UseQueryOptions<RoomType[], Error>> } = {}) => {
	return useQuery({
		queryKey: ["admin-rooms"],
		queryFn: async () => {
			const data = await adminRoomFetch("");
			return data.rooms as RoomType[];
		},
		...options
	});
};

/** Payload for PUT /api/room/:id – language is the language id (string). */
export type AdminUpdateRoomPayload = {
	title?: string;
	language?: string;
	isCameraRequired?: boolean;
	isMicRequired?: boolean;
	maxUsersCount?: number;
};

export const useAdminUpdateRoom = ({ options }: { options?: UseMutationOptions<RoomType, Error, { id: string; data: AdminUpdateRoomPayload }> } = {}) => {
	const queryClient = useQueryClient();
	const { onSuccess, ...restOptions } = options ?? {};
	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: AdminUpdateRoomPayload }) => adminRoomFetch(`/${id}`, { method: "PUT", body: JSON.stringify(data) }),
		...restOptions,
		onSuccess: (...args) => {
			queryClient.invalidateQueries({ queryKey: ["admin-rooms"] });
			onSuccess?.(...args);
		}
	});
};

export const useAdminDeleteRoom = ({ options }: { options?: UseMutationOptions<null, Error, string> } = {}) => {
	const queryClient = useQueryClient();
	const { onSuccess, ...restOptions } = options ?? {};
	return useMutation({
		mutationFn: (id: string) => adminRoomFetch(`/${id}`, { method: "DELETE" }),
		...restOptions,
		onSuccess: (...args) => {
			queryClient.invalidateQueries({ queryKey: ["admin-rooms"] });
			onSuccess?.(...args);
		}
	});
};

export const useAdminGetRoomUsers = ({ id, options }: { id: string; options?: Partial<UseQueryOptions<{ users: string[] }, Error>> }) => {
	return useQuery({
		queryKey: ["admin-room-users", id],
		queryFn: () => adminRoomFetch(`/${id}/users`),
		...options
	});
};

export const useAdminRemoveRoomUser = ({ options }: { options?: UseMutationOptions<unknown, Error, { roomId: string; userId: string }> } = {}) => {
	const queryClient = useQueryClient();
	const { onSuccess, ...restOptions } = options ?? {};
	return useMutation({
		mutationFn: ({ roomId, userId }: { roomId: string; userId: string }) => adminRoomFetch(`/${roomId}/users/${userId}`, { method: "DELETE" }),
		...restOptions,
		onSuccess: (...args) => {
			queryClient.invalidateQueries({ queryKey: ["admin-room-users", args[1].roomId] });
			onSuccess?.(...args);
		}
	});
};
