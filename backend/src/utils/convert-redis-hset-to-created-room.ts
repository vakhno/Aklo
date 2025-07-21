import type { CreatedRoomType } from "../libs/types/room.type";

export const convertRedisHsetToCreatedRoom = (redisRoom: Record<keyof CreatedRoomType, string>): CreatedRoomType => {
	return {
		id: redisRoom?.id,
		creatorId: redisRoom.creatorId,
		title: redisRoom.title,
		category: redisRoom.category,
		language: redisRoom.language,
		isCameraRequired: redisRoom.isCameraRequired === "true",
		isMicRequired: redisRoom.isMicRequired === "true",
		isAvailable: redisRoom.isAvailable === "true",
		isCreatorActive: redisRoom.isCreatorActive === "true",
		maxGuestCount: Number(redisRoom.maxGuestCount),
		createdAt: Number(redisRoom.createdAt),
	};
};
