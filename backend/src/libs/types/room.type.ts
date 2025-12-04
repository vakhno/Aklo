import type { FlattenMaps, HydratedDocument, InferSchemaType, Model } from "mongoose";
import type * as z from "zod";

import type { RoomSchema } from "../../routes/room/room.model";
import type { LanguageDocLeanType } from "../types/language.type";
import type { RoomInputSchema, RoomReadySchema } from "../zod-schemas/room.schema";

// RoomInputSchemaType - type of data that was send directly from front to back for room creation
export type RoomInputSchemaType = z.infer<typeof RoomInputSchema>;
// RoomReadySchemaType - RoomInputSchemaType data that was modified (new fields was added) for saving to the DB
export type RoomReadySchemaType = z.infer<typeof RoomReadySchema>;
// RoomSchemaType - type of mongo Schema
export type RoomSchemaType = InferSchemaType<typeof RoomSchema>;
// RoomModelType - type of data that receiving from mongo
export type RoomModelType = Model<RoomSchemaType>;
// RoomModelType - type of data that receiving from mongo and was lean()
export type RoomDocType = HydratedDocument<RoomSchemaType>;
// RoomModelType - type of data that receiving from mongo with populated refs
export type RoomDocLeanType = FlattenMaps<RoomSchemaType> & ReturnType<RoomDocType["toObject"]>;
// RoomModelType - type of data that receiving from mongo with populated refs and was lean()
export type RoomDocLeanPopulatedType = Omit<RoomDocLeanType, "language"> & { language: LanguageDocLeanType };

// RoomCacheType - type of data that storing in redis
export type RoomCacheType = {
	availableUsers: string[];
} & Pick<RoomReadySchemaType, "maxUsersCount" | "creatorId" | "activeUsersCount">;

export interface GetAllRoomsPropsType {
	language: string;
	limit: number;
	page: number;
}

export type HsetCreatedRoomType = Record<keyof RoomCacheType, string>;
