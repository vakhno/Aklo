import type { Server } from "socket.io";

import { getRoom } from "../services/room.service.js";

export function registerSocketEvents(io: Server) {
	io.on("connection", (socket) => {
		socket.on("join", async (roomId) => {
			const room = await getRoom(roomId);
			const { isAvailable } = room;

			if (isAvailable) {
				socket.join(roomId);

				const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);

				if (clients.length === 2) {
					const [firstClientId] = clients;

					io.to(firstClientId).emit("ready", roomId);
				}

				socket.emit("join-success");
			}
		});

		socket.on("signal", ({ roomId, data }) => {
			socket.to(roomId).emit("signal", { sender: socket.id, data });
		});

		socket.on("disconnect", () => {});
	});
}
