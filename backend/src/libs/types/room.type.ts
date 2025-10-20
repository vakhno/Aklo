import type { z } from "zod";

import type { NewRoomSchema } from "../zod-schemas/new-room.schema";

export interface CreatedRoomType {
	id: string;
	creatorId: string;
	title: string;
	category: string;
	language: string;
	isCameraRequired: boolean;
	isMicRequired: boolean;
	isAvailable: boolean;
	isCreatorActive: boolean;
	currentGuestCount: number;
	maxGuestCount: number;
	createdAt: number;
}

export interface GetAllRoomsPropsType {
	category: string;
	language: string;
	limit: number;
	page: number;
}

export type NewRoomType = z.infer<typeof NewRoomSchema>;

export type HsetCreatedRoomType = Record<keyof CreatedRoomType, string>;
