import { client } from "./client";
import { roomIndexSearch } from "./room/room.search";
import { rouletteIndexSearch } from "./roulette/roulette.search";

export const initCache = async () => {
	await client.connect();
	await roomIndexSearch(client);
	await rouletteIndexSearch(client);
};
