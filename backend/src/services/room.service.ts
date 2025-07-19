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

// export async function updateRoomGuestCount(roomId: string, increment: boolean): Promise<Room | null> {
// 	try {
// 		const room = await getRoom(roomId);

// 		if (!room) {
// 			throw new Error("Room is not exist!");
// 		}

// 		room.currentGuestCount += increment ? 1 : -1;

// 		if (room.currentGuestCount <= 0) {
// 			await deleteRoom(roomId);

// 			return null;
// 		}

// 		const multi = redisClient.multi();

// 		multi.hSet(ROOMS_KEY, roomId, JSON.stringify(room));
// 		multi.set(`${ROOM_PREFIX}${roomId}`, JSON.stringify(room));

// 		multi.exec();

// 		return room;
// 	}
// 	catch (error) {
// 		// eslint-disable-next-line no-console
// 		console.log(error);

// 		throw new Error("Delete room error!");
// 	}
// }

// [
// 	5,
// 	"room:82889741-38d4-405c-99a5-f4f5fbd7b866",
// 	[
// 		"createdAt",
// 		"1750875203631",
// 		"id",
// 		"82889741-38d4-405c-99a5-f4f5fbd7b866",
// 		"title",
// 		"#555555555555555",
// 		"category",
// 		"news",
// 		"language",
// 		"chinese",
// 		"isCameraRequired",
// 		"true",
// 		"isMicRequired",
// 		"true",
// 		"isAvailable",
// 		"true",
// 	],
// 	"room:7d819d18-9e5b-46a8-a6e3-9b7b0cb4ed47",
// 	[
// 		"createdAt",
// 		"1750875154056",
// 		"id",
// 		"7d819d18-9e5b-46a8-a6e3-9b7b0cb4ed47",
// 		"title",
// 		"#44444444444444444",
// 		"category",
// 		"gaming",
// 		"language",
// 		"turkish",
// 		"isCameraRequired",
// 		"true",
// 		"isMicRequired",
// 		"true",
// 		"isAvailable",
// 		"true",
// 	],
// 	"room:a491d8b2-0974-4848-86d0-8ef334e323d7",
// 	[
// 		"createdAt",
// 		"1750875136580",
// 		"id",
// 		"a491d8b2-0974-4848-86d0-8ef334e323d7",
// 		"title",
// 		"#333333333333333",
// 		"category",
// 		"tech",
// 		"language",
// 		"japanese",
// 		"isCameraRequired",
// 		"true",
// 		"isMicRequired",
// 		"true",
// 		"isAvailable",
// 		"true",
// 	],
// ];
