import type { FlattenMaps, HydratedDocument, InferSchemaType, Model } from "mongoose";
import type * as z from "zod";

import type { LanguageSchema } from "../../routes/language/language.model";
import type { LanguageInputSchema, LanguageReadySchema } from "../zod-schemas/language.schema";

// LanguageInputSchemaType - type of data that was send directly from front to back
export type LanguageInputSchemaType = z.infer<typeof LanguageInputSchema>;
// LanguageReadySchemaType - type of data that combined LanguageInputSchemaType and other modifications (new fields was added) for saving to the DB
export type LanguageReadySchemaType = z.infer<typeof LanguageReadySchema>;
// LanguageSchemaType - type of data that was send directly from front to back for language creation
export type LanguageSchemaType = InferSchemaType<typeof LanguageSchema>;
// LanguageModelType - type of data that receiving from mongo
export type LanguageModelType = Model<LanguageSchemaType>;
// LanguageDocType - type of data that available after create (new LanguageModel()) or update (await LanguageModel.findByIdAndUpdate()) and etc
export type LanguageDocType = HydratedDocument<LanguageSchemaType>;
// LanguageDocLeanType - type of data that combined LanguageDocType and lean();
export type LanguageDocLeanType = FlattenMaps<LanguageSchemaType> & ReturnType<LanguageDocType["toObject"]>;
