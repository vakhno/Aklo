import { useInfiniteQuery, useMutation } from "@tanstack/react-query";

import type { NewRoomType } from "@/lib/types/room";

const createRoom = async ({ newRoomData }: { newRoomData: NewRoomType }) => {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/room`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
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
	onSuccess?: () => void;
	onError?: () => void;
};

export const useCreateRoom = ({ onSuccess, onError }: useCreateRoomProps) => {
	return useMutation({
		mutationFn: createRoom,
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
