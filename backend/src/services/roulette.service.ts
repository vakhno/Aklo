import { v4 as uuidv4 } from "uuid";

import type { CreatedRouletteType, HsetCreatedRouletteType } from "../libs/types/roulette.type";

import redisClient from "../configs/redis.config";
import { LANGUAGE_LIST } from "../libs/constants/language-list";
import { ROULETTE_PREFIX } from "../libs/constants/redis";
import { convertObjToRedisHset } from "../utils/convert-obj-to-redis-hset";
import { convertRedisHsetToCreatedRoulette } from "../utils/convert-redis-hset-to-created-roulette";

export async function getRoulette(rouletteId: string): Promise<CreatedRouletteType> {
	try {
		const roulette = await redisClient.hGetAll(`${ROULETTE_PREFIX}${rouletteId}`) as HsetCreatedRouletteType;

		if (Object.keys(roulette).length === 0) {
			throw new Error("No roulette found");
		}

		const parsedRoulette = convertRedisHsetToCreatedRoulette(roulette);

		return parsedRoulette;
	}
	catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);

		throw new Error("Get roulette error!");
	}
}

export async function getAllRoulettes(): Promise<{ roulettes: CreatedRouletteType[] }> {
	try {
		const query = "*";
		const result = await redisClient.sendCommand([
			"FT.SEARCH",
			"roulettes_idx",
			query,
			"SORTBY",
			"currentUserCount",
			"DESC",
		]);

		if (!Array.isArray(result)) {
			throw new TypeError("Unexpected FT.SEARCH response");
		}

		const total = result[0];
		const roulettes: CreatedRouletteType[] = [];

		if (total > 0) {
			result.forEach((item) => {
				if (Array.isArray(item)) {
					const roulette = {} as HsetCreatedRouletteType;

					for (let i = 0; i < item.length; i += 2) {
						roulette[item[i] as keyof CreatedRouletteType] = item[i + 1];
					}

					roulettes.push(convertRedisHsetToCreatedRoulette(roulette));
				}
			});
		}

		return { roulettes };
	}
	catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);

		throw new Error("Get all rooms error");
	}
}

export async function cleanAllRoulettes() {
	try {
		const keys = await redisClient.keys(`${ROULETTE_PREFIX}*`);

		if (keys.length === 0) {
			return { message: "No roulettes found to clean" };
		}

		const promises = keys.map(async (key) => {
			const roulette = await redisClient.hGetAll(key) as HsetCreatedRouletteType;

			if (Object.keys(roulette).length > 0) {
				await redisClient.hSet(key, {
					availableUsers: JSON.stringify([]),
					currentUserCount: "0",
				});
			}
		});

		await Promise.all(promises);
	}
	catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);

		throw new Error("Clean all roulettes error");
	}
}

export async function removeAllRoulettes() {
	try {
		const keys = await redisClient.keys(`${ROULETTE_PREFIX}*`);

		if (keys.length > 0) {
			await redisClient.del(keys as [string, ...string[]]);
		}
	}
	catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);

		throw new Error("Remove all roulettes error");
	}
}

export async function fillRoulettes() {
	try {
		await removeAllRoulettes();

		const roulettes: CreatedRouletteType[] = Object.values(LANGUAGE_LIST).map(language => ({
			id: uuidv4(),
			language: language.value,
			isCameraRequired: true,
			isMicRequired: true,
			currentUserCount: 0,
			availableUsers: [],
		}));

		const promises = roulettes.map(async (roulette) => {
			const convertedRoulette = convertObjToRedisHset(roulette);
			await redisClient.hSet(`${ROULETTE_PREFIX}${roulette.id}`, convertedRoulette);
		});

		await Promise.all(promises);
	}
	catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);

		throw new Error("Fill roulettes error");
	}
}

export async function updateRoulette(languageId: string, updates: Partial<CreatedRouletteType>): Promise<CreatedRouletteType> {
	try {
		const room = await getRoulette(languageId);

		if (!room) {
			throw new Error("Roulette not found");
		}

		const updatedRoom = { ...room, ...updates };
		const convertedRoom = convertObjToRedisHset(updatedRoom);

		await redisClient.hSet(`${ROULETTE_PREFIX}${languageId}`, convertedRoom);

		return updatedRoom;
	}
	catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);

		throw new Error("Update roulette error");
	}
}
