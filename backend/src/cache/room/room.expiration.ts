import type { RedisClientType } from "redis";
import type { Server } from "socket.io";

import { ROOM_PREFIX } from "../../libs/constants/redis";

export const roomExpirationListener = async (io: Server, client: RedisClientType, subscriber: RedisClientType) => {
	await client.configSet("notify-keyspace-events", "Ex");

	await subscriber.connect();

	await subscriber.pSubscribe("__keyevent@0__:expired", async (message) => {
		if (message.startsWith(ROOM_PREFIX)) {
			const roomId = message.split(":")[1];

			const sockets = await io.in(roomId).fetchSockets();

			for (const socket of sockets) {
				socket.data.roomDeleted = true;
			}

			io.to(roomId).emit("room-expired", { roomId });
		}
	});
};
