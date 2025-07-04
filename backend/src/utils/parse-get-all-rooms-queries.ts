import type { Request } from "express";

import type { GetAllRoomsPropsType } from "../libs/types/room.type";

export const parseGetAllRoomsQueries = (req: Request): GetAllRoomsPropsType => {
	const { category = "", language = "", limit = 10, page = 1 } = req.query;

	return {
		category: Array.isArray(category) ? String(category[0]) ?? "" : String(category) ?? "",
		language: Array.isArray(language) ? String(language[0]) ?? "" : String(language) ?? "",
		limit: Number(limit),
		page: Number(page),
	};
};
