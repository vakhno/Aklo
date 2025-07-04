import type { z } from "zod";

import type { CategoryKeyType, LanguageKeyType } from "@/lib/types/list.type";
import type { FilterRoomSchema } from "@/lib/zod-schemas/filter-room.schema";
import type { NewRoomSchema } from "@/lib/zod-schemas/new-room.schema";

export type RoomType = {
	id: string;
	title: string;
	category: CategoryKeyType;
	language: LanguageKeyType;
	maxGuestCount: number;
	currentGuestCount: number;
	isCameraRequired: boolean;
	isMicRequired: boolean;
	isAvailable: boolean;
	createdAt: Date;
};

export type NewRoomType = z.infer<typeof NewRoomSchema>;
export type FilterRoomType = z.infer<typeof FilterRoomSchema>;
