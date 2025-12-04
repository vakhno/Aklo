import { useInfiniteQuery, useMutation, type UseMutationOptions, useQuery, type UseQueryOptions } from "@tanstack/react-query";

import type { LanguageType } from "@/lib/types/language";
import type { NewRoomSchemaType, RoomType } from "@/lib/types/room";

type getRoomProps = {
	id: string;
};

const getRoom = async ({ id }: getRoomProps): Promise<RoomType> => {
	const response = await fetch(`${import.meta.env.VITE_SOCKET_URL}/api/room/${id}`, {
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

	return room;
};

type useGetRoomProps = {
	id: string;
	options?: UseQueryOptions<RoomType, Error>;
};

export const useGetRoom = ({ id, options }: useGetRoomProps) => {
	return useQuery({
		queryKey: ["room", id],
		queryFn: () => getRoom({ id }),
		...options
	});
};

type createRoomProps = {
	newRoomData: NewRoomSchemaType;
};

const createRoom = async ({ newRoomData }: createRoomProps): Promise<RoomType> => {
	const url = `${import.meta.env.VITE_SOCKET_URL}/api/room`;
	const response = await fetch(url, {
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
	const response = await fetch(`${import.meta.env.VITE_SOCKET_URL}/api/room/${id}`, {
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
	const response = await fetch(`${import.meta.env.VITE_SOCKET_URL}/api/room?page=${page}&limit=${limit}${language ? `&language=${language}` : ""}`, {
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
	const url = `${import.meta.env.VITE_SOCKET_URL}/api/room/${roomId}/join`;
	const response = await fetch(url, {
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
	const response = await fetch(`${import.meta.env.VITE_SOCKET_URL}/api/room/${id}/is-creator`, {
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
	options?: UseQueryOptions<boolean, Error>;
};

export const useCheckIsCreator = ({ id, options }: useCheckIsCreatorProps) => {
	return useQuery({
		queryKey: ["is-creator", id],
		queryFn: () => checkIsCreator({ id }),
		...options
	});
};

const getIdListOfOwnRooms = async (): Promise<string[]> => {
	const response = await fetch(`${import.meta.env.VITE_SOCKET_URL}/api/room/own-room-ids`, {
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
	const url = `${import.meta.env.VITE_SOCKET_URL}/api/room/language`;
	const response = await fetch(url, {
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
