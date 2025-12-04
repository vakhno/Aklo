import type { RouletteCacheType } from "../libs/types/roulette.type";

export const convertRedisHashToRouletteCache = (hash: Record<string, string>): RouletteCacheType => {
	return {
		availableUsers: JSON.parse(hash.availableUsers),
	};
};
