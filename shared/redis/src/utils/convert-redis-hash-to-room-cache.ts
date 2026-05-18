import type { RoomCacheType } from "@shared/mongo/types/room";

export const convertRedisHashToRoomCache = (hash: Record<string, string>): RoomCacheType => {
	return {
		availableUsers: JSON.parse(hash.availableUsers),
		maxUsersCount: Number(hash.maxUsersCount),
		activeUsersCount: Number(hash.activeUsersCount),
		creatorId: String(hash.creatorId),
	};
};
