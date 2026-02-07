import type { RoomCacheType, RoomDocLeanType } from "../libs/types/room.type";

import { client as redisClient } from "../cache/client.js";
import { ROOM_PREFIX } from "../libs/constants/redis.js";
import { RoomModel } from "../routes/room/room.model.js";
import { convertObjToRedisHash } from "../utils/convert-obj-to-redis-hash.js";
import { convertRedisHashToRoomCache } from "../utils/convert-redis-hash-to-room-cache.js";
import { formatError } from "../utils/format-error.js";

export const createRoomCache = async (roomId: string): Promise<void> => {
	try {
		if (!roomId) {
			throw new Error("No room id provided");
		}

		const roomLeanModel = await RoomModel.findById(roomId).lean() as RoomDocLeanType | null;

		if (!roomLeanModel) {
			throw new Error("Room not found");
		}

		const { _id, maxUsersCount, creatorId, activeUsersCount } = roomLeanModel;
		const key = `${ROOM_PREFIX}${_id}`;
		const roomCache: RoomCacheType = { availableUsers: [], creatorId, maxUsersCount, activeUsersCount };

		await redisClient.hSet(key, convertObjToRedisHash(roomCache));
	}
	catch (error) {
		throw new Error(formatError(error));
	}
};

export const joinRoomCache = async (roomId: string, userId: string, cookieCreatorId: string | undefined): Promise<void> => {
	try {
		if (!roomId) {
			throw new Error("No room id provided");
		}

		if (!userId) {
			throw new Error("No user id provided");
		}

		const key = `${ROOM_PREFIX}${roomId}`;
		const roomCache = await redisClient.hGetAll(key);

		if (!roomCache) {
			throw new Error("Room cache not found");
		}

		const convertedRoomCache = convertRedisHashToRoomCache(roomCache);
		const { maxUsersCount, availableUsers, creatorId, activeUsersCount } = convertedRoomCache;

		if (availableUsers.includes(userId)) {
			throw new Error("User already joined");
		}

		const isCreator = cookieCreatorId === creatorId;

		if (isCreator) {
			const updatedRoomCache = {
				availableUsers: [...availableUsers, userId],
			};

			await redisClient.hSet(key, convertObjToRedisHash(updatedRoomCache));
		}
		else {
			if (activeUsersCount >= maxUsersCount) {
				throw new Error("Room available users list is full");
			}

			const updatedRoomCache = {
				availableUsers: [...availableUsers, userId],
				activeUsersCount: activeUsersCount + 1,
			};

			await redisClient.hSet(key, convertObjToRedisHash(updatedRoomCache));
		}
	}
	catch (error) {
		throw new Error(formatError(error));
	}
};

export const leftRoomCache = async (roomId: string, userId: string, creator: string | undefined): Promise<void> => {
	try {
		if (!roomId) {
			throw new Error("No room id provided");
		}

		if (!userId) {
			throw new Error("No user id provided");
		}

		const key = `${ROOM_PREFIX}${roomId}`;
		const roomCache = await redisClient.hGetAll(key);

		if (!roomCache || Object.keys(roomCache).length === 0) {
			throw new Error("Room cache not found");
		}

		const convertedRoomCache = convertRedisHashToRoomCache(roomCache);
		const { availableUsers, creatorId, activeUsersCount } = convertedRoomCache;

		if (!availableUsers.includes(userId)) {
			throw new Error("User is not in the room");
		}

		const isCreator = creator === creatorId;

		if (isCreator) {
			const updatedRoomCache = {
				availableUsers: availableUsers.filter(id => id !== userId),
			};

			await redisClient.hSet(key, convertObjToRedisHash(updatedRoomCache));
		}
		else {
			const updatedRoomCache = {
				availableUsers: availableUsers.filter(id => id !== userId),
				activeUsersCount: activeUsersCount - 1,
			};

			await redisClient.hSet(key, convertObjToRedisHash(updatedRoomCache));
		}
	}
	catch (error) {
		throw new Error(formatError(error));
	}
};

export const resetAllRoomsCache = async (): Promise<void> => {
	try {
		const key = `${ROOM_PREFIX}*`;
		const keys = await redisClient.keys(key);
		const value: Partial<Record<keyof RoomCacheType, string>> = { availableUsers: "[]" };

		for (const key of keys) {
			await redisClient.hSet(key, value);
		}
	}
	catch (error) {
		throw new Error(formatError(error));
	}
};

export const resetRoomCache = async (roomId: string): Promise<void> => {
	try {
		const key = `${ROOM_PREFIX}${roomId}`;
		const exists = await redisClient.exists(key);

		if (!exists) {
			throw new Error("Room cache not found");
		}

		const value: Partial<Record<keyof RoomCacheType, string>> = { availableUsers: "[]" };

		await redisClient.hSet(key, value);
	}
	catch (error) {
		throw new Error(formatError(error));
	}
};

export const deleteAllRoomsCache = async (): Promise<void> => {
	try {
		const key = `${ROOM_PREFIX}*`;
		const keys = await redisClient.keys(key);

		for (const key of keys) {
			await redisClient.del(key);
		}
	}
	catch (error) {
		throw new Error(formatError(error));
	}
};

export const deleteRoomCache = async (roomId: string): Promise<void> => {
	try {
		const key = `${ROOM_PREFIX}${roomId}`;
		const exists = await redisClient.exists(key);

		if (!exists) {
			throw new Error("Room cache not found");
		}

		await redisClient.del(key);
	}
	catch (error) {
		throw new Error(formatError(error));
	}
};

export const getRoomCache = async (roomId: string): Promise<RoomCacheType> => {
	try {
		if (!roomId) {
			throw new Error("No room provided");
		}
		const key = `${ROOM_PREFIX}${roomId}`;
		const isExist = await redisClient.exists(key);

		if (!isExist) {
			throw new Error("No such room cache");
		}

		const cache = await redisClient.hGetAll(`${ROOM_PREFIX}${roomId}`);
		const convertedCache = convertRedisHashToRoomCache(cache);

		return convertedCache;
	}
	catch (error) {
		throw new Error(formatError(error));
	}
};
