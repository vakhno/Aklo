import type { RoomInputSchemaType, RoomReadySchemaType } from "@shared/schemas/room";
import type { FlattenMaps, HydratedDocument, InferSchemaType, Model } from "mongoose";

import type { RoomSchema } from "../models/room.model";

import type { LanguageDocLeanType } from "./language";

export type { RoomInputSchemaType, RoomReadySchemaType };

export type RoomSchemaType = InferSchemaType<typeof RoomSchema>;
export type RoomModelType = Model<RoomSchemaType>;
export type RoomDocType = HydratedDocument<RoomSchemaType>;
export type RoomDocLeanType = FlattenMaps<RoomSchemaType> & ReturnType<RoomDocType["toObject"]>;
export type RoomDocLeanPopulatedType = Omit<RoomDocLeanType, "language"> & { language: LanguageDocLeanType };

export type RoomCacheType = {
	availableUsers: string[];
} & Pick<RoomReadySchemaType, "maxUsersCount" | "creatorId" | "activeUsersCount">;

export interface GetAllRoomsPropsType {
	language: string;
	limit: number;
	page: number;
}

export type HsetCreatedRoomType = Record<keyof RoomCacheType, string>;
