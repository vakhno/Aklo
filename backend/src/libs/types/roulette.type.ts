import type { FlattenMaps, HydratedDocument, InferSchemaType, Model } from "mongoose";
import type * as z from "zod";

import type { RouletteSchema } from "../../routes/roulette/roulette.model";
import type { LanguageDocLeanType } from "../types/language.type";
import type { RouletteInputSchema, RouletteReadySchema } from "../zod-schemas/roulette.schema";

// RouletteInputSchemaType - type of data that was send directly from front to back
export type RouletteInputSchemaType = z.infer<typeof RouletteInputSchema>;
// RouletteReadySchemaType - type of data that combined RouletteInputSchemaType and other modifications (new fields was added) for saving to the DB
export type RouletteReadySchemaType = z.infer<typeof RouletteReadySchema>;
// RouletteSchemaType - type of mongo Schema
export type RouletteSchemaType = InferSchemaType<typeof RouletteSchema>;
// RouletteModelType - type of mongo Model
export type RouletteModelType = Model<RouletteSchemaType>;
// RouletteDocType - type of data that available after create (new RouletteModel()) or update (await RouletteModel.findByIdAndUpdate()) and etc
export type RouletteDocType = HydratedDocument<RouletteSchemaType>;
// RouletteDocLeanType - type of data that combined RouletteDocType and lean();
export type RouletteDocLeanType = FlattenMaps<RouletteSchemaType> & ReturnType<RouletteDocType["toObject"]>;
// RouletteDocLeanPopulatedType - type of data that combined RouletteDocLeanType with populate() (by default all fields should be populated here)
export type RouletteDocLeanPopulatedType = Omit<RouletteDocLeanType, "language"> & { language: LanguageDocLeanType };

// RouletteCacheType - type of data that storing in redis
export interface RouletteCacheType {
	availableUsers: string[];
}

export interface GetAllRoulettesPropsType {
	language: string;
	limit: number;
	page: number;
}

export type HsetCreatedRouletteType = Record<keyof RouletteCacheType, string>;
