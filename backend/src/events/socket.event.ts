import type { Server } from "socket.io";

import { getRoom, updateRoom } from "../services/room.service.js";
import { getCookies } from "../utils/get-cookies.js";

export function registerSocketEvents(io: Server) {
	io.on("connection", (socket) => {
		socket.on("join", async (roomId) => {
			socket.data.roomId = roomId;

			try {
				const room = await getRoom(roomId);
				const { isAvailable, creatorId, maxGuestCount } = room;
				const cookies = getCookies({ socket });
				const isCreator = !!cookies[roomId] && cookies[roomId] === creatorId;

				if (isCreator) {
					socket.join(roomId);

					const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
					const roomUpdates = { isCreatorActive: true };

					await updateRoom(roomId, roomUpdates);

					if (clients.length === 2) {
						const [firstClientId] = clients;

						io.to(firstClientId).emit("ready", roomId);
					}
				}
				else if (isAvailable) {
					const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
					let guestCount = 0;

					for (const clientId of clients) {
						const clientSocket = io.sockets.sockets.get(clientId);

						if (clientSocket) {
							const clientCookies = getCookies({ socket: clientSocket });
							const isClientCreator = !!clientCookies[roomId] && clientCookies[roomId] === creatorId;

							if (!isClientCreator) {
								guestCount++;
							}
						}
					}

					if (guestCount < maxGuestCount) {
						socket.join(roomId);

						const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);

						if (clients.length === 2) {
							const [firstClientId] = clients;

							io.to(firstClientId).emit("ready", roomId);
						}

						if (guestCount + 1 === maxGuestCount) {
							const roomUpdates = { isAvailable: false };

							await updateRoom(roomId, roomUpdates);
						}
					}
				}
			}
			catch (error) {
				// eslint-disable-next-line no-console
				console.log(error);
			}
		});

		socket.on("signal", ({ roomId, data }) => {
			socket.to(roomId).emit("signal", { sender: socket.id, data });
		});

		socket.on("disconnect", async () => {
			const isRoomDeleted = socket.data.roomDeleted;

			if (isRoomDeleted) {
				return;
			}

			const roomId = socket.data.roomId;

			if (!roomId) {
				return;
			}

			const room = await getRoom(roomId);
			const { creatorId } = room;
			const cookies = getCookies({ socket });
			const isCreator = !!cookies[roomId] && cookies[roomId] === creatorId;

			if (!isCreator) {
				const roomUpdates = { isAvailable: true };

				await updateRoom(roomId, roomUpdates);
			}
			else {
				const roomUpdates = { isCreatorActive: false };

				await updateRoom(roomId, roomUpdates);
			}

			io.emit("leave");
		});
	});
}
