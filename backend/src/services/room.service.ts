import { v4 as uuidv4 } from "uuid";

import type { CreatedRoomType, NewRoomType } from "../libs/types/room.type";

import redisClient from "../configs/redis.config";
import { ROOM_PREFIX, ROOMS_KEY } from "../libs/constants/redis";
import { convertObjToRedisHset } from "../utils/convert-obj-to-redis-hset";
import { convertRedisHsetToCreatedRoom } from "../utils/convert-redis-hset-to-created-room";

export async function createRoom(roomData: NewRoomType): Promise<CreatedRoomType> {
	try {
		const room: CreatedRoomType = {
			id: uuidv4(),
			creatorId: uuidv4(),
			...roomData,
			isAvailable: true,
			isCreatorActive: true,
			currentGuestCount: 0,
			maxGuestCount: 1,
			createdAt: new Date().getTime(),
		};

		const convertedRoom = convertObjToRedisHset(room);

		await redisClient.hSet(`${ROOM_PREFIX}${convertedRoom.id}`, convertedRoom);

		await redisClient.expire(`${ROOM_PREFIX}${convertedRoom.id}`, 7200);

		return room;
	}
	catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);

		throw new Error("Create room service error!");
	}
}

export async function getAllRooms({ category, language, limit, page }: { category?: string; language?: string; limit: number; page: number }): Promise<{ rooms: CreatedRoomType[]; isHasMore: boolean }> {
	try {
		let query = "*";
		const offset = (page - 1) * limit;
		const filters = [];

		if (category) {
			filters.push(`@category:{${category}}`);
		}

		if (language) {
			filters.push(`@language:{${language}}`);
		}

		if (filters.length) {
			query = filters.join(" ");
		}

		const result = await redisClient.sendCommand([
			"FT.SEARCH",
			"rooms_idx",
			query,
			"SORTBY",
			"createdAt",
			"DESC",
			"LIMIT",
			String(offset),
			String(limit),
		]);

		if (!Array.isArray(result)) {
			throw new TypeError("Unexpected FT.SEARCH response");
		}

		const total = result[0];
		const isHasMore = Number(page) * limit < total;
		const rooms: CreatedRoomType[] = [];

		if (total > 0) {
			result.forEach((item) => {
				if (Array.isArray(item)) {
					const room = {} as Record<keyof CreatedRoomType, string>;

					for (let i = 0; i < item.length; i += 2) {
						room[item[i] as keyof CreatedRoomType] = item[i + 1];
					}

					rooms.push(convertRedisHsetToCreatedRoom(room));
				}
			});
		}

		return { rooms, isHasMore };
	}
	catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);

		throw new Error("Get all rooms error");
	}
}

export async function getRoom(roomId: string): Promise<CreatedRoomType> {
	try {
		const room = await redisClient.hGetAll(`${ROOM_PREFIX}${roomId}`) as Record<keyof CreatedRoomType, string>;
		if (!room || Object.keys(room).length === 0) {
			throw new Error("No room found");
		}

		const parsedRoom = convertRedisHsetToCreatedRoom(room);

		return parsedRoom;
	}
	catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);

		throw new Error("Get room error!");
	}
}

export async function deleteRoom(roomId: string): Promise<void> {
	try {
		const room = await redisClient.exists(`${ROOM_PREFIX}${roomId}`);

		if (!room) {
			throw new Error("Room is not exist!");
		}

		const multi = redisClient.multi();

		multi.hDel(ROOMS_KEY, roomId);
		multi.del(`${ROOM_PREFIX}${roomId}`);

		await multi.exec();
	}
	catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);

		throw new Error("Delete room error!");
	}
}

export async function updateRoom(roomId: string, updates: Partial<CreatedRoomType>): Promise<CreatedRoomType> {
	try {
		const room = await getRoom(roomId);

		if (!room) {
			throw new Error("Room not found");
		}

		const updatedRoom = { ...room, ...updates };
		const convertedRoom = convertObjToRedisHset(updatedRoom);

		await redisClient.hSet(`${ROOM_PREFIX}${roomId}`, convertedRoom);

		return updatedRoom;
	}
	catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);

		throw new Error("Update room error");
	}
}
