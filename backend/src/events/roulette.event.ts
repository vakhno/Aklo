import type { Server } from "socket.io";

import redisClient from "../configs/redis.config";
import { ROULETTE_QUEUE } from "../libs/constants/redis";
import { getRoulette, updateRoulette } from "../services/roulette.service";

async function addToQueue(socketId: string): Promise<void> {
	await redisClient.sendCommand(["RPUSH", ROULETTE_QUEUE, socketId]);
}

async function removeFromQueue({ languageId, socketId }: { languageId: string; socketId: string }): Promise<void> {
	const roulette = await getRoulette(languageId);
	const rouletteUpdates = { currentUserCount: roulette.currentUserCount - 1 };

	await updateRoulette(languageId, rouletteUpdates);

	await redisClient.sendCommand(["LREM", ROULETTE_QUEUE, "0", socketId]);
}

async function getPartnerSocketId(): Promise<string | null> {
	const partnerSocketId = await redisClient.sendCommand(["LPOP", ROULETTE_QUEUE, "1"]) as string[] | null;

	if (partnerSocketId) {
		return partnerSocketId[0];
	}

	return partnerSocketId;
}

async function searchRoulettePartner({ languageId, socketId, io }: { languageId: string; socketId: string; io: Server }): Promise<void> {
	const partnerSocketId = await getPartnerSocketId();
	const roulette = await getRoulette(languageId);
	const rouletteUpdates = { currentUserCount: roulette.currentUserCount + 1 };
	await updateRoulette(languageId, rouletteUpdates);

	if (partnerSocketId) {
		io.to(socketId).emit("roulette-detect", { partnerSocketId, isInitiator: true });
		io.to(partnerSocketId).emit("roulette-detect", { partnerSocketId: socketId, isInitiator: false });
	}
	else {
		await addToQueue(socketId);
	}
}

async function skipRoulettePartner({ languageId, socketId, partnerSocketId, io }: { languageId: string; socketId: string; partnerSocketId: string; io: Server }): Promise<void> {
	await searchRoulettePartner({ languageId, socketId, io });

	if (partnerSocketId) {
		io.to(partnerSocketId).emit("roulette-joined");
	}
}

async function disconnectRoulette({ languageId, socketId, partnerSocketId, io }: { languageId: string; socketId: string; partnerSocketId: string; io: Server }): Promise<void> {
	await removeFromQueue({ languageId, socketId });

	if (partnerSocketId) {
		io.to(partnerSocketId).emit("roulette-left");
	}
}

export function registerRouletteSocketEvents(io: Server) {
	io.on("connection", (socket) => {
		const socketId = socket.id;

		socket.on("roulette-join", ({ languageId }) => {
			socket.data.languageId = languageId;
		});

		socket.on("roulette-search", async () => {
			const { languageId } = socket.data;

			socket.data.isActive = true;

			await searchRoulettePartner({ languageId, socketId, io });
		});

		socket.on("roulette-skip", async ({ partnerSocketId }) => {
			const { languageId } = socket.data;

			await skipRoulettePartner({ languageId, socketId, partnerSocketId, io });

			delete socket.data.partnerSocketId;
		});

		socket.on("roulette-stop", async ({ languageId, partnerSocketId }) => {
			await disconnectRoulette({ languageId, socketId, partnerSocketId, io });

			delete socket.data.isActive;
			delete socket.data.partnerSocketId;
		});

		socket.on("signal", ({ partnerSocketId, data }) => {
			socket.data.partnerSocketId = partnerSocketId;

			socket.to(partnerSocketId).emit("signal", { sender: socketId, data });
		});

		socket.on("disconnect", async () => {
			const { languageId, partnerSocketId, isActive } = socket.data;

			if (isActive) {
				await disconnectRoulette({ languageId, socketId, partnerSocketId, io });
			}
		});
	});
}
