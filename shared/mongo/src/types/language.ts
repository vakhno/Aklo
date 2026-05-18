import type { FlattenMaps, HydratedDocument, InferSchemaType, Model } from "mongoose";

import type { LanguageSchema } from "../models/language.model";

export type { LanguageInputSchemaType, LanguageReadySchemaType } from "@shared/schemas/language";

export type LanguageSchemaType = InferSchemaType<typeof LanguageSchema>;
export type LanguageModelType = Model<LanguageSchemaType>;
export type LanguageDocType = HydratedDocument<LanguageSchemaType>;
export type LanguageDocLeanType = FlattenMaps<LanguageSchemaType> & ReturnType<LanguageDocType["toObject"]>;
