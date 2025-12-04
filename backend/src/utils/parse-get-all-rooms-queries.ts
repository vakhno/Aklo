import type { Request } from "express";

import type { GetAllRoomsPropsType } from "../libs/types/room.type";

export const parseGetAllRoomsQueries = (req: Request): GetAllRoomsPropsType => {
	const { language = "", limit = 10, page = 1 } = req.query;

	return {
		language: Array.isArray(language) ? String(language[0]) ?? "" : String(language) ?? "",
		limit: Number(limit),
		page: Number(page),
	};
};
