import type { Server } from "socket.io";

import { getRoom } from "../services/room.service";

export function registerRoomSocketEvents(io: Server) {
	io.on("connection", (socket) => {
		socket.on("self-room-join", async (roomId) => {
			socket.data.roomId = roomId;

			const room = await getRoom(roomId);
			const { isAvailable } = room;

			if (!isAvailable) {
				socket.emit("self-room-join-failed");

				return;
			}

			socket.join(roomId);
			socket.to(roomId).emit("opponents-room-new-join");
			socket.emit("self-room-join-success");
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

		socket.on("disconnect", () => {
			const { roomId } = socket.data;

			socket.to(roomId).emit("opponents-room-user-disconnect");
		});
	});
}
