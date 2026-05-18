import type { Request } from "express";

import type { GetAllRoulettesPropsType } from "../libs/types/roulette.type";

export const parseGetAllRoulettesQueries = (req: Request): GetAllRoulettesPropsType => {
	const { language = "", limit = 0, page = 0 } = req.query;

	return {
		language: Array.isArray(language) ? String(language[0]) ?? "" : String(language) ?? "",
		limit: Number(limit),
		page: Number(page),
	};
};
