import { client } from "./client.js";
import { roomIndexSearch } from "./room/room.search.js";
import { rouletteIndexSearch } from "./roulette/roulette.search.js";

export const initCache = async () => {
	await client.connect();
	await roomIndexSearch(client);
	await rouletteIndexSearch(client);
};
