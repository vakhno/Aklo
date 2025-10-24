import type { CreatedRouletteType, HsetCreatedRouletteType } from "../libs/types/roulette.type";

export const convertRedisHsetToCreatedRoulette = (redisRoulette: HsetCreatedRouletteType): CreatedRouletteType => {
	return {
		id: redisRoulette?.id,
		language: redisRoulette.language,
		availableUsers: JSON.parse(redisRoulette.availableUsers),
		isCameraRequired: redisRoulette.isCameraRequired === "true",
		isMicRequired: redisRoulette.isMicRequired === "true",
		currentUserCount: Number(redisRoulette.currentUserCount),
	};
};
