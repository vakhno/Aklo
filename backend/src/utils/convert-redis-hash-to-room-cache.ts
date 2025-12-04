import type { RoomCacheType } from "../libs/types/room.type";

export const convertRedisHashToRoomCache = (hash: Record<string, string>): RoomCacheType => {
	return {
		availableUsers: JSON.parse(hash.availableUsers),
		maxUsersCount: Number(hash.maxUsersCount),
		activeUsersCount: Number(hash.activeUsersCount),
		creatorId: String(hash.creatorId),
	};
};
