import type { Server } from "socket.io";

import { client } from "./client";
import { roomExpirationListener } from "./room/room.expiration";
import { roomIndexSearch } from "./room/room.search";
import { rouletteIndexSearch } from "./roulette/roulette.search";
import { subscriber } from "./subscriber";

export const initCache = async (io: Server) => {
	await client.connect();
	await roomIndexSearch(client);
	await rouletteIndexSearch(client);
	await roomExpirationListener(io, client, subscriber);
};
