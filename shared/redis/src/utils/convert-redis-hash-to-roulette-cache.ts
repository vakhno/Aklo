import type { RouletteCacheType } from "@shared/mongo/types/roulette";

export const convertRedisHashToRouletteCache = (hash: Record<string, string>): RouletteCacheType => {
	return {
		availableUsers: JSON.parse(hash.availableUsers),
	};
};
