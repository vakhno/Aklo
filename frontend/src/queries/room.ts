import { useInfiniteQuery, useMutation } from "@tanstack/react-query";

import type { NewRoomType, RoomType } from "@/lib/types/room";

const getRoom = async ({ roomId }: { roomId: string }): Promise<RoomType> => {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/room/${roomId}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});

	const { ok } = response;

	if (!ok) {
		throw new Error("Failed to load room!");
	}

	const { room } = await response.json();

	return room;
};

type useGetRoomProps = {

	onSuccess?: (room: RoomType) => void;
	onError?: () => void;
};

export const useGetRoom = ({ onSuccess, onError }: useGetRoomProps) => {
	return useMutation({
		mutationFn: getRoom,
		onSuccess,
		onError
	});
};

const createRoom = async ({ newRoomData }: { newRoomData: NewRoomType }) => {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/room`, {
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

	const result = await response.json();

	return result;
};

type useCreateRoomProps = {
	onSuccess?: (room: RoomType) => void;
	onError?: () => void;
};

export const useCreateRoom = ({ onSuccess, onError }: useCreateRoomProps) => {
	return useMutation({
		mutationFn: createRoom,
		onSuccess,
		onError
	});
};

const deleteRoom = async ({ roomId }: { roomId: string }) => {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/room/${roomId}`, {
		method: "DELETE"
	});

	const { ok } = response;

	if (!ok) {
		throw new Error("Failed to delete a room!");
	}
};

type useDeleteRoomProps = {
	onSuccess?: () => void;
	onError?: () => void;
};

export const useDeleteRoom = ({ onSuccess, onError }: useDeleteRoomProps) => {
	return useMutation({
		mutationFn: deleteRoom,
		onSuccess,
		onError
	});
};

const getAllRooms = async ({ limit, page, language, category }: { limit: number; page: number; language?: string; category?: string }) => {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/room?page=${page}&limit=${limit}${language ? `&language=${language}` : ""}${category ? `&category=${category}` : ""}`, {
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
	category?: string;
	limit: number;
};

export const useGetRooms = ({ language, category, limit }: UseGetRoomsProps) => {
	return useInfiniteQuery({
		queryKey: ["rooms", language, category, limit],
		queryFn: ({ pageParam }) => getAllRooms({ page: pageParam, limit, language, category }),
		getNextPageParam: (lastPage, _, lastPageParam, __) => (lastPage ? (lastPage.isHasMore ? lastPageParam + 1 : undefined) : undefined),
		initialPageParam: 1
	});
};

const joinRoom = async ({ roomId }: { roomId: string }): Promise<RoomType> => {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/room/${roomId}/join`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		}
	});

	const { ok } = response;

	if (!ok) {
		throw new Error("Failed to join room!");
	}

	const result = await response.json();

	return result;
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

const checkIsCreator = async ({ roomId }: { roomId: string }): Promise<boolean> => {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/room/${roomId}/is-creator`, {
		method: "GET"
	});

	const { ok } = response;

	if (!ok) {
		throw new Error("Failed to check is creator!");
	}

	const result = await response.json();

	return result;
};

type useCheckIsCreatorProps = {
	onSuccess?: (isCreator: boolean) => void;
	onError?: () => void;
};

export const useCheckIsCreator = ({ onSuccess, onError }: useCheckIsCreatorProps) => {
	return useMutation({
		mutationFn: checkIsCreator,
		onSuccess,
		onError
	});
};
