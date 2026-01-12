import type { z } from "zod";

import type { LanguageType } from "@/lib/types/language";
import type { FilterRoomSchema } from "@/lib/zod-schemas/filter-room.schema";
import type JoinRoomSchema from "@/lib/zod-schemas/join-room.schema";
import type { NewRoomSchema } from "@/lib/zod-schemas/new-room.schema";
import type SettingsRoomSchema from "@/lib/zod-schemas/settings-room.schema";

export type RoomType = {
	_id: string;
	creatorId: string;
	title: string;
	language: LanguageType;
	isCameraRequired: boolean;
	isMicRequired: boolean;
	activeUsersCount: number;
	maxUsersCount: number;
	createdAt: number;
};

export type NewRoomSchemaType = z.infer<typeof NewRoomSchema>;
export type FilterRoomSchemaType = z.infer<typeof FilterRoomSchema>;
export type SettingsRoomSchemaType = z.infer<typeof SettingsRoomSchema>;
export type JoinRoomSchemaType = z.infer<typeof JoinRoomSchema>;
