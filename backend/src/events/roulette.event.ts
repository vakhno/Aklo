import type { Server } from "socket.io";

import redisClient from "../configs/redis.config";
import { ROULETTE_QUEUE_PREFIX } from "../libs/constants/redis";
import { getRoulette, updateRoulette } from "../services/roulette.service";

async function addToQueue({ languageId, socketId }: { languageId: string; socketId: string }): Promise<void> {
	await redisClient.sendCommand(["RPUSH", `${ROULETTE_QUEUE_PREFIX}${languageId}`, socketId]);
}

async function removeFromQueue({ languageId, socketId }: { languageId: string; socketId: string }): Promise<void> {
	await redisClient.sendCommand(["LREM", `${ROULETTE_QUEUE_PREFIX}${languageId}`, "0", socketId]);
}

async function incrementCounter({ languageId }: { languageId: string }): Promise<void> {
	const roulette = await getRoulette(languageId);
	const rouletteUpdates = { currentUserCount: roulette.currentUserCount + 1 };

	await updateRoulette(languageId, rouletteUpdates);
}

async function decrementCounter({ languageId }: { languageId: string }): Promise<void> {
	const roulette = await getRoulette(languageId);
	const rouletteUpdates = { currentUserCount: roulette.currentUserCount - 1 };

	await updateRoulette(languageId, rouletteUpdates);
}

async function getPartnerSocketId({ languageId }: { languageId: string }): Promise<string | null> {
	const partnerSocketId = await redisClient.sendCommand(["LPOP", `${ROULETTE_QUEUE_PREFIX}${languageId}`, "1"]) as string[] | null;

	if (partnerSocketId) {
		return partnerSocketId[0];
	}

	return partnerSocketId;
}

async function searchRoulettePartner({ languageId, socketId, io }: { languageId: string; socketId: string; io: Server }): Promise<void> {
	const partnerSocketId = await getPartnerSocketId({ languageId });

	if (partnerSocketId) {
		io.to(socketId).emit("roulette-detect", { partnerSocketId, isInitiator: true });
		io.to(partnerSocketId).emit("roulette-detect", { partnerSocketId: socketId, isInitiator: false });
	}
	else {
		await addToQueue({ languageId, socketId });
	}
}

async function skipRoulettePartner({ languageId, socketId, partnerSocketId, io }: { languageId: string; socketId: string; partnerSocketId: string; io: Server }): Promise<void> {
	await searchRoulettePartner({ languageId, socketId, io });

	if (partnerSocketId) {
		io.to(partnerSocketId).emit("opponents-roulette-skip");
	}
}

async function disconnectRoulette({ languageId, socketId, partnerSocketId, io }: { languageId: string; socketId: string; partnerSocketId: string; io: Server }): Promise<void> {
	await decrementCounter({ languageId });
	await removeFromQueue({ languageId, socketId });

	if (partnerSocketId) {
		io.to(partnerSocketId).emit("roulette-left");
	}
}

export function registerRouletteSocketEvents(io: Server) {
	io.on("connection", (socket) => {
		const socketId = socket.id;

		socket.on("self-roulette-join", ({ languageId }) => {
			socket.data.languageId = languageId;
		});

		socket.on("self-roulette-start-search", async () => {
			const { languageId } = socket.data;

			socket.data.isActive = true;

			await incrementCounter({ languageId });
			await searchRoulettePartner({ languageId, socketId, io });
		});

		socket.on("self-roulette-start-search-after-opponent-skip", async () => {
			const { languageId } = socket.data;

			await searchRoulettePartner({ languageId, socketId, io });
		});

		socket.on("self-roulette-skip-search", async () => {
			const { languageId } = socket.data;

			await searchRoulettePartner({ languageId, socketId, io });
		});

		socket.on("roulette-skip", async () => {
			const { languageId, partnerSocketId } = socket.data;

			await skipRoulettePartner({ languageId, socketId, partnerSocketId, io });

			delete socket.data.partnerSocketId;
		});

		socket.on("roulette-stop", async () => {
			const { languageId, partnerSocketId } = socket.data;

			await disconnectRoulette({ languageId, socketId, partnerSocketId, io });

			delete socket.data.isActive;
			delete socket.data.partnerSocketId;
		});

		socket.on("roulette-pause", async () => {
			const { languageId } = socket.data;

			delete socket.data.isActive;

			await decrementCounter({ languageId });
			await removeFromQueue({ languageId, socketId });
		});

		socket.on("roulette-disconnect", async () => {
			const { languageId, partnerSocketId } = socket.data;

			await disconnectRoulette({ languageId, socketId, partnerSocketId, io });
		});

		socket.on("opponents-roulette-send-offer", ({ partnerSocketId, offer }: { partnerSocketId: string; offer: RTCSessionDescription }) => {
			socket.data.partnerSocketId = partnerSocketId;

			socket.to(partnerSocketId).emit("opponents-roulette-receive-offer", { partnerSocketId: socketId, offer });
		});

		socket.on("opponents-roulette-send-answer", ({ partnerSocketId, answer }: { partnerSocketId: string; answer: RTCSessionDescriptionInit }) => {
			socket.data.partnerSocketId = partnerSocketId;

			socket.to(partnerSocketId).emit("opponents-roulette-receive-answer", { answer });
		});

		socket.on("opponents-roulette-send-ice-candidate", ({ partnerSocketId, candidate }: { partnerSocketId: string; candidate: RTCIceCandidate }) => {
			socket.to(partnerSocketId).emit("opponents-roulette-receive-ice-candidate", { candidate });
		});

		socket.on("disconnect", async () => {
			const { languageId, partnerSocketId, isActive } = socket.data;

			if (isActive) {
				await disconnectRoulette({ languageId, socketId, partnerSocketId, io });
			}
		});
	});
}
