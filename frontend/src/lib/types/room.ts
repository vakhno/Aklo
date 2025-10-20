import type { z } from "zod";

import type { CategoryKeyType, LanguageKeyType } from "@/lib/types/list.type";
import type { FilterRoomSchema } from "@/lib/zod-schemas/filter-room.schema";
import type JoinRoomSchema from "@/lib/zod-schemas/join-room.schema";
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
	isCreatorActive: boolean;
	currentGuestCount: number;
	maxGuestCount: number;
	createdAt: number;
};

export type NewRoomSchemaType = z.infer<typeof NewRoomSchema>;
export type FilterRoomSchemaType = z.infer<typeof FilterRoomSchema>;
export type JoinRoomSchemaType = z.infer<typeof JoinRoomSchema>;
