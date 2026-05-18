import type { RedisClientType } from "redis";

export const rouletteIndexSearch = async (client: RedisClientType): Promise<void> => {
	try {
		await client.sendCommand([
			"FT.INFO",
			"roulettes_cache_idx",
		]);
	}
	catch (error) {
		console.warn(error);

		await client.sendCommand([
			"FT.CREATE",
			"roulettes_cache_idx",
			"ON",
			"HASH",
			"PREFIX",
			"1",
			"roulette:",
			"SCHEMA",
			"language",
			"TAG",
			"isCameraRequired",
			"TAG",
			"isMicRequired",
			"TAG",
			"currentUserCount",
			"NUMERIC",
			"SORTABLE",
		]);
	}
};
