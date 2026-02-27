import type { RouletteCacheType, RouletteDocLeanType } from "../libs/types/roulette.type";

import { client as redisClient } from "../cache/client.js";
import { ROULETTE_PREFIX } from "../libs/constants/redis.js";
import { RouletteModel } from "../routes/roulette/roulette.model.js";
import { convertObjToRedisHash } from "../utils/convert-obj-to-redis-hash.js";
import { convertRedisHashToRouletteCache } from "../utils/convert-redis-hash-to-roulette-cache.js";
import { formatError } from "../utils/format-error.js";

export const createRouletteCache = async (rouletteId: string): Promise<void> => {
	try {
		if (!rouletteId) {
			throw new Error("No roulette id provided");
		}

		const rouletteLeanModel = await RouletteModel.findById(rouletteId).lean() as RouletteDocLeanType | null;

		if (!rouletteLeanModel) {
			throw new Error("Roulette not found");
		}

		const { _id } = rouletteLeanModel;
		const rouletteKey = `${ROULETTE_PREFIX}${_id}`;
		const cachedRoulette: RouletteCacheType = { availableUsers: [] };
		const convertedRoulette = convertObjToRedisHash(cachedRoulette);

		await redisClient.hSet(rouletteKey, convertedRoulette);
	}
	catch (error) {
		throw new Error(formatError(error));
	}
};

export const joinRouletteCache = async (rouletteId: string, socketId: string): Promise<string | null> => {
	try {
		if (!rouletteId) {
			throw new Error("No roulette id provided");
		}

		if (!socketId) {
			throw new Error("No socket id provided");
		}

		const rouletteAvailableUsersKey = `${ROULETTE_PREFIX}${rouletteId}:availableUsers`;
		const partnerSocketId = await redisClient.sendCommand(["LPOP", rouletteAvailableUsersKey, "1"]) as string[] | null;

		if (partnerSocketId && partnerSocketId[0]) {
			return partnerSocketId[0];
		}

		await redisClient.sendCommand(["RPUSH", rouletteAvailableUsersKey, socketId]);

		return null;
	}
	catch (error) {
		throw new Error(formatError(error));
	}
};

export const leftRouletteCache = async (rouletteId: string, socketId: string): Promise<void> => {
	try {
		if (!rouletteId) {
			throw new Error("No roulette id provided");
		}

		if (!socketId) {
			throw new Error("No socket id provided");
		}

		const rouletteAvailableUsersKey = `${ROULETTE_PREFIX}${rouletteId}:availableUsers`;

		await redisClient.lRem(rouletteAvailableUsersKey, 0, socketId);
	}
	catch (error) {
		throw new Error(formatError(error));
	}
};

export const resetAllRoulettesCache = async (): Promise<void> => {
	try {
		const key = `${ROULETTE_PREFIX}*`;
		const keys = await redisClient.keys(key);
		const value: Partial<Record<keyof RouletteCacheType, string>> = { availableUsers: "[]" };

		for (const key of keys) {
			await redisClient.hSet(key, value);
		}
	}
	catch (error) {
		throw new Error(formatError(error));
	}
};

export const resetRouletteCache = async (rouletteId: string): Promise<void> => {
	try {
		const key = `${ROULETTE_PREFIX}${rouletteId}`;
		const exists = await redisClient.exists(key);

		if (!exists) {
			throw new Error("Roulette cache not found");
		}

		const value: Partial<Record<keyof RouletteCacheType, string>> = { availableUsers: "[]" };

		await redisClient.hSet(key, value);
	}
	catch (error) {
		throw new Error(formatError(error));
	}
};

export const deleteAllRoulettesCache = async (): Promise<void> => {
	try {
		const key = `${ROULETTE_PREFIX}*`;
		const keys = await redisClient.keys(key);

		for (const key of keys) {
			await redisClient.del(key);
		}
	}
	catch (error) {
		throw new Error(formatError(error));
	}
};

export const deleteRouletteCache = async (rouletteId: string): Promise<void> => {
	try {
		const key = `${ROULETTE_PREFIX}${rouletteId}`;
		const listKey = `${ROULETTE_PREFIX}${rouletteId}:availableUsers`;
		const exists = await redisClient.exists(key);

		if (!exists) {
			throw new Error("Roulette cache not found");
		}

		await redisClient.del(key);
		await redisClient.del(listKey);
	}
	catch (error) {
		throw new Error(formatError(error));
	}
};

export const getRouletteCache = async (rouletteId: string): Promise<RouletteCacheType> => {
	try {
		if (!rouletteId) {
			throw new Error("No roulette provided");
		}

		const key = `${ROULETTE_PREFIX}${rouletteId}`;
		const isExist = await redisClient.exists(key);

		if (!isExist) {
			throw new Error("No such roulette cache");
		}

		const cache = await redisClient.hGetAll(key);
		const convertedCache = convertRedisHashToRouletteCache(cache);

		return convertedCache;
	}
	catch (error) {
		throw new Error(formatError(error));
	}
};

export const getRouletteAvailableUsersList = async (rouletteId: string): Promise<string[]> => {
	try {
		if (!rouletteId) {
			throw new Error("No roulette id provided");
		}

		const listKey = `${ROULETTE_PREFIX}${rouletteId}:availableUsers`;
		const list = await redisClient.lRange(listKey, 0, -1);

		return list ?? [];
	}
	catch (error) {
		throw new Error(formatError(error));
	}
};
