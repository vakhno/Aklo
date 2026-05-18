import { Types } from "mongoose";

export const isValidObjectId = (id: string): boolean => Types.ObjectId.isValid(id);

export const toObjectId = (id: string): Types.ObjectId => new Types.ObjectId(id);
