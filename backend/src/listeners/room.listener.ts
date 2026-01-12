import type { Server } from "socket.io";

import { RoomModel } from "../routes/room/room.model";
import * as roomCacheService from "../services/room-cache.service";

export const setupRoomListener = (io: Server): void => {
	const namespace = io.of("/room");
	const pipeline = [{ $match: { operationType: "delete" } }];
	const stream = RoomModel.watch(pipeline);

	stream.on("change", async (change: any) => {
		if (change.operationType === "delete") {
			const roomId = change.documentKey._id.toString();

			try {
				await roomCacheService.deleteRoomCache(roomId);

				namespace.to(roomId).emit("room-deleted", { roomId });
			}
			catch (error) {
				console.error(`Error notifying clients for deleted room ${roomId}:`, error);
			}
		}
	});

	stream.on("error", (err) => {
		console.error("Room change stream error:", err);
	});
};
