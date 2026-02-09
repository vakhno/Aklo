import type { Server } from "socket.io";

import { joinRoomCache, leftRoomCache } from "../../services/room-cache.service.js";
import { joinRoom, leftRoom } from "../../services/room.service.js";
import { getCookies } from "../../utils/get-cookies.js";

export function registerRoomSocketEvents(io: Server) {
	const namespace = io.of("/room");

	namespace.on("connection", (socket) => {
		const socketId = socket.id;

		socket.on("room-join", async (roomId) => {
			try {
				socket.data.roomId = roomId;

				const cookies = getCookies({ socket });
				const creatorId = cookies?.[roomId];

				await joinRoomCache(roomId, socketId, creatorId);

				socket.join(roomId);

				socket.to(roomId).emit("room-new-join");

				await joinRoom(roomId, creatorId);

				const socketList = await namespace.in(roomId).fetchSockets();
				const socketIdList = socketList.map(socket => socket.id).filter(id => id !== socketId);

				socket.emit("room-join-success", { socketIdList });
			}
			catch (error) {
				// eslint-disable-next-line no-console
				console.log(error);

				socket.emit("room-failed");
			}
		});

		socket.on("room-send-offer", ({ offer, targetSocketId }: { offer: RTCSessionDescription; targetSocketId: string }) => {
			socket.to(targetSocketId).emit("room-receive-offer", { offer, fromSocketId: socketId });
		});

		socket.on("room-send-answer", ({ answer, targetSocketId }: { answer: RTCSessionDescriptionInit; targetSocketId: string }) => {
			socket.to(targetSocketId).emit("room-receive-answer", { answer, fromSocketId: socketId });
		});

		socket.on("room-send-ice-candidate", ({ candidate, targetSocketId }: { candidate: RTCIceCandidate; targetSocketId: string }) => {
			socket.to(targetSocketId).emit("room-receive-ice-candidate", { candidate, fromSocketId: socketId });
		});

		socket.on("room-kick", async ({ targetSocketId }) => {
			const { roomId } = socket.data;
			const cookies = getCookies({ socket });
			const creatorId = cookies?.[roomId];

			if (creatorId) {
				socket.to(targetSocketId).emit("room-kick-success");
			}
		});

		socket.on("room-deleted", () => {
			socket.data.isRoomDeleted = true;

			socket.disconnect(true);
		});

		socket.on("room-disconnect", () => {
			socket.disconnect(true);
		});

		socket.on("disconnect", async () => {
			const { roomId, isRoomDeleted } = socket.data;
			const cookies = getCookies({ socket });
			const creator = cookies?.[roomId];

			socket.to(roomId).emit("room-leave", socketId);

			if (!isRoomDeleted) {
				await leftRoomCache(roomId, socketId, creator);
				await leftRoom(roomId, creator);
			}
		});
	});
}
