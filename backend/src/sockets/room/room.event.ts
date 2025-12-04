import type { Server } from "socket.io";

import { joinRoomCache, leftRoomCache } from "../../services/room-cache.service";
import { joinRoom, leftRoom } from "../../services/room.service";
import { getCookies } from "../../utils/get-cookies";

export function registerRoomSocketEvents(io: Server) {
	const namespace = io.of("/room");

	namespace.on("connection", (socket) => {
		const socketId = socket.id;

		socket.on("self-room-join", async (roomId) => {
			try {
				socket.data.roomId = roomId;

				const cookies = getCookies({ socket });
				const creatorId = cookies?.[roomId];

				await joinRoomCache(roomId, socketId, creatorId);

				socket.join(roomId);
				socket.to(roomId).emit("opponents-room-new-join");
				socket.emit("self-room-join-success");

				await joinRoom(roomId, creatorId);
			}
			catch (error) {
				// eslint-disable-next-line no-console
				console.log(error);

				socket.emit("self-room-join-failed");
			}
		});

		socket.on("opponents-room-send-offer", ({ offer }: { offer: RTCSessionDescription }) => {
			const { roomId } = socket.data;

			socket.to(roomId).emit("opponents-room-receive-offer", { offer });
		});

		socket.on("opponents-room-send-answer", ({ answer }: { answer: RTCSessionDescriptionInit }) => {
			const { roomId } = socket.data;

			socket.to(roomId).emit("opponents-room-receive-answer", { answer });
		});

		socket.on("opponents-room-send-ice-candidate", ({ candidate }: { candidate: RTCIceCandidate }) => {
			const { roomId } = socket.data;

			socket.to(roomId).emit("opponents-room-receive-ice-candidate", { candidate });
		});

		socket.on("self-kick-all", () => {
			const { roomId } = socket.data;

			socket.to(roomId).emit("opponents-room-user-kick");
		});

		socket.on("opponent-kick", () => {
			socket.disconnect(true);
		});

		socket.on("disconnect", async () => {
			const { roomId } = socket.data;
			const cookies = getCookies({ socket });
			const creator = cookies?.[roomId];

			await leftRoomCache(roomId, socketId, creator);
			await leftRoom(roomId, creator);

			socket.to(roomId).emit("opponents-room-user-disconnect");
		});
	});
}
