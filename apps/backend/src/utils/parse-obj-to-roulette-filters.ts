import { Types } from "mongoose";

import type { RouletteSchemaType } from "../libs/types/roulette.type";

export const parseObjToRouletteFilters = (obj: Record<string, any>): Partial<RouletteSchemaType> => {
	const filters: Partial<RouletteSchemaType> = {};

	if (obj?.language && Types.ObjectId.isValid(obj.language)) {
		filters.language = new Types.ObjectId(obj.language);
	}

	return filters;
};
