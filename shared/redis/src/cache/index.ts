import { setRedisClient } from "../client";

import { client } from "./connection";
import { roomIndexSearch } from "./room/room.search";
import { rouletteIndexSearch } from "./roulette/roulette.search";

export const initCache = async () => {
	await client.connect();
	setRedisClient(client);
	await roomIndexSearch(client);
	await rouletteIndexSearch(client);
};
