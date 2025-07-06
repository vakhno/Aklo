import { createClient } from "redis";

const redisClient = createClient({
	url: process.env.REDIS_URL,
});

redisClient.on("error", err => console.error("Redis Client Error", err));
redisClient.on("connect", () => console.warn("Redis Client Connected"));

const searchRoomIndexInit = async () => {
	try {
		await redisClient.sendCommand([
			"FT.INFO",
			"rooms_idx",
		]);
	}
	catch (error) {
		console.warn(error);
		await redisClient.sendCommand([
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
			"category",
			"TAG",
			"language",
			"TAG",
			"isCameraRequired",
			"TAG",
			"isMicRequired",
			"TAG",
			"isAvailable",
			"TAG",
			"createdAt",
			"NUMERIC",
			"SORTABLE",
		]);
	}
};

export const connectRedis = async () => {
	await redisClient.connect();
	await searchRoomIndexInit();
};

export default redisClient;
