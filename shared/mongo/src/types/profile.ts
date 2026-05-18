import type { FlattenMaps, HydratedDocument, InferSchemaType, Model } from "mongoose";

import type { ProfileSchema } from "../models/profile.model";

export type ProfileSchemaType = InferSchemaType<typeof ProfileSchema>;
export type ProfileModelType = Model<ProfileSchemaType>;
export type ProfileDocType = HydratedDocument<ProfileSchemaType>;
export type ProfileDocLeanType = FlattenMaps<ProfileSchemaType> & ReturnType<ProfileDocType["toObject"]>;
