import type { Server } from "socket.io";

import { joinRouletteCache, leftRouletteCache } from "../../services/roulette-cache.service";
import { joinRoulette, leftRoulette } from "../../services/roulette.service";

export function registerRouletteSocketEvents(io: Server) {
	const namespace = io.of("/roulette");

	namespace.on("connection", (socket) => {
		const socketId = socket.id;

		socket.on("roulette-join", async ({ rouletteId }) => {
			socket.data.rouletteId = rouletteId;

			await joinRoulette(rouletteId);
		});

		socket.on("roulette-start-search", async () => {
			const { rouletteId } = socket.data;

			socket.data.isActive = true;

			const newPartnerSocketId = await joinRouletteCache(rouletteId, socketId);

			if (newPartnerSocketId) {
				namespace.to(socketId).emit("roulette-detect", { partnerSocketId: newPartnerSocketId, isInitiator: true });
				namespace.to(newPartnerSocketId).emit("roulette-detect", { partnerSocketId: socketId, isInitiator: false });
			}
		});

		socket.on("roulette-skipped", async () => {
			const { rouletteId } = socket.data;

			const newPartnerSocketId = await joinRouletteCache(rouletteId, socketId);

			if (newPartnerSocketId) {
				namespace.to(socketId).emit("roulette-detect", { partnerSocketId: newPartnerSocketId, isInitiator: true });
				namespace.to(newPartnerSocketId).emit("roulette-detect", { partnerSocketId: socketId, isInitiator: false });
			}
		});

		socket.on("roulette-skip", async () => {
			const { rouletteId, partnerSocketId } = socket.data;

			const newPartnerSocketId = await joinRouletteCache(rouletteId, socketId);

			if (newPartnerSocketId) {
				namespace.to(socketId).emit("roulette-detect", { partnerSocketId: newPartnerSocketId, isInitiator: true });
				namespace.to(newPartnerSocketId).emit("roulette-detect", { partnerSocketId: socketId, isInitiator: false });
			}

			if (partnerSocketId) {
				namespace.to(partnerSocketId).emit("roulette-skipped-by-partner");
			}

			delete socket.data.partnerSocketId;
		});

		socket.on("roulette-stop", async () => {
			const { rouletteId, partnerSocketId } = socket.data;

			await leftRouletteCache(rouletteId, socketId);

			if (partnerSocketId) {
				namespace.to(partnerSocketId).emit("roulette-left");
			}

			delete socket.data.isActive;
			delete socket.data.partnerSocketId;
		});

		socket.on("roulette-pause", async () => {
			const { rouletteId } = socket.data;

			delete socket.data.isActive;

			await leftRouletteCache(rouletteId, socketId);
		});

		socket.on("roulette-start-search-after-opponent-skip", async () => {
			const { rouletteId } = socket.data;

			const newPartnerSocketId = await joinRouletteCache(rouletteId, socketId);

			if (newPartnerSocketId) {
				namespace.to(socketId).emit("roulette-detect", { partnerSocketId: newPartnerSocketId, isInitiator: true });
				namespace.to(newPartnerSocketId).emit("roulette-detect", { partnerSocketId: socketId, isInitiator: false });
			}
		});

		socket.on("roulette-send-offer", ({ partnerSocketId, offer }: { partnerSocketId: string; offer: RTCSessionDescription }) => {
			socket.data.partnerSocketId = partnerSocketId;

			socket.to(partnerSocketId).emit("roulette-receive-offer", { partnerSocketId: socketId, offer });
		});

		socket.on("roulette-send-answer", ({ partnerSocketId, answer }: { partnerSocketId: string; answer: RTCSessionDescriptionInit }) => {
			socket.data.partnerSocketId = partnerSocketId;

			socket.to(partnerSocketId).emit("roulette-receive-answer", { answer });
		});

		socket.on("roulette-send-ice-candidate", ({ partnerSocketId, candidate }: { partnerSocketId: string; candidate: RTCIceCandidate }) => {
			socket.to(partnerSocketId).emit("roulette-receive-ice-candidate", { candidate });
		});

		socket.on("disconnect", async () => {
			const { rouletteId, partnerSocketId, isActive } = socket.data;

			if (isActive) {
				await leftRouletteCache(rouletteId, socketId);

				if (partnerSocketId) {
					namespace.to(partnerSocketId).emit("roulette-left");
				}
			}
			await leftRoulette(rouletteId);
		});
	});
}
