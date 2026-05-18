import type { FlattenMaps, HydratedDocument, InferSchemaType, Model } from "mongoose";
import type { z } from "zod";

import { RouletteInputSchema, RouletteReadySchema } from "@shared/schemas/roulette";

import type { RouletteSchema } from "../models/roulette.model";

import type { LanguageDocLeanType } from "./language";

export type RouletteInputSchemaType = z.infer<typeof RouletteInputSchema>;
export type RouletteReadySchemaType = z.infer<typeof RouletteReadySchema>;
export type RouletteSchemaType = InferSchemaType<typeof RouletteSchema>;
export type RouletteModelType = Model<RouletteSchemaType>;
export type RouletteDocType = HydratedDocument<RouletteSchemaType>;
export type RouletteDocLeanType = FlattenMaps<RouletteSchemaType> & ReturnType<RouletteDocType["toObject"]>;
export type RouletteDocLeanPopulatedType = Omit<RouletteDocLeanType, "language"> & { language: LanguageDocLeanType };

export interface RouletteCacheType {
	availableUsers: string[];
}

export interface GetAllRoulettesPropsType {
	language: string;
	limit: number;
	page: number;
}

export type HsetCreatedRouletteType = Record<keyof RouletteCacheType, string>;
