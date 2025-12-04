import type { z } from "zod";

import type { LanguageKeyType } from "@/lib/types/list.type";
import type { FilterRoomSchema } from "@/lib/zod-schemas/filter-room.schema";
import type JoinRoomSchema from "@/lib/zod-schemas/join-room.schema";
import type { NewRoomSchema } from "@/lib/zod-schemas/new-room.schema";

export type RoomType = {
	_id: string;
	creatorId: string;
	title: string;
	language: LanguageKeyType;
	isCameraRequired: boolean;
	isMicRequired: boolean;
	activeUsersCount: number;
	maxUsersCount: number;
	createdAt: number;
};

export type NewRoomSchemaType = z.infer<typeof NewRoomSchema>;
export type FilterRoomSchemaType = z.infer<typeof FilterRoomSchema>;
export type JoinRoomSchemaType = z.infer<typeof JoinRoomSchema>;
