import type { Server } from "socket.io";

import { createClient } from "redis";

const redisClient = createClient({
	url: process.env.REDIS_URL,
	socket: {},
});

redisClient.on("error", err => console.error("Redis Client Error", err));
redisClient.on("connect", () => console.warn("Redis Client Connected"));

export const redisSubscriber = createClient({
	url: process.env.REDIS_URL,
	socket: {},
});

redisSubscriber.on("error", err => console.error("Redis Subscriber Error", err));
redisSubscriber.on("connect", () => console.warn("Redis Subscriber Connected"));

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

const searchRouletteIndexInit = async () => {
	try {
		await redisClient.sendCommand([
			"FT.INFO",
			"roulettes_idx",
		]);
	}
	catch (error) {
		console.warn(error);
		await redisClient.sendCommand([
			"FT.CREATE",
			"roulettes_idx",
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

export const setupExpirationListener = async (io: Server) => {
	await redisClient.configSet("notify-keyspace-events", "Ex");

	await redisSubscriber.connect();

	await redisSubscriber.pSubscribe("__keyevent@0__:expired", async (message) => {
		if (message.startsWith("room:")) {
			const roomId = message.split(":")[1];

			const sockets = await io.in(roomId).fetchSockets();

			for (const socket of sockets) {
				socket.data.roomDeleted = true;
			}

			io.to(roomId).emit("room-expired", { roomId });
		}
	});
};

export const connectRedis = async (io: Server) => {
	await redisClient.connect();
	await searchRoomIndexInit();
	await searchRouletteIndexInit();
	await setupExpirationListener(io);
};

export default redisClient;
