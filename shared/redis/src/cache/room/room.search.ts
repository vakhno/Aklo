import type { RedisClientType } from "redis";

export const roomIndexSearch = async (client: RedisClientType) => {
	try {
		await client.sendCommand([
			"FT.INFO",
			"rooms_idx",
		]);
	}
	catch (error) {
		console.warn(error);
		await client.sendCommand([
			"FT.CREATE",
			"rooms_idx",
			"ON",
			"HASH",
			"PREFIX",
			"1",
			"room:",
			"SCHEMA",
			"title",
			"TEXT",
			"language",
			"TAG",
			"isCameraRequired",
			"TAG",
			"isMicRequired",
			"TAG",
			"createdAt",
			"NUMERIC",
			"SORTABLE",
		]);
	}
};
