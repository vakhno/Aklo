import type { z } from "zod";

import type { CategoryKeyType, LanguageKeyType } from "@/lib/types/list.type";
import type { FilterRoomSchema } from "@/lib/zod-schemas/filter-room.schema";
import type { NewRoomSchema } from "@/lib/zod-schemas/new-room.schema";

export type RoomType = {
	id: string;
	creatorId: string;
	title: string;
	category: CategoryKeyType;
	language: LanguageKeyType;
	isCameraRequired: boolean;
	isMicRequired: boolean;
	isAvailable: boolean;
	maxGuestCount: number;
	createdAt: number;
};

export type NewRoomType = z.infer<typeof NewRoomSchema>;
export type FilterRoomType = z.infer<typeof FilterRoomSchema>;
