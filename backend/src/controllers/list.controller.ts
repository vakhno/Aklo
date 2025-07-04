import type { Request, Response } from "express";

import * as listService from "../services/list.service";

export async function getUsedCategories(req: Request, res: Response) {
	try {
		const categories = await listService.getUsedCategories();

		res.status(200).json(categories);
	}
	catch (error) {
		res.status(500).json({ error });
	}
}

export async function getUsedLanguages(req: Request, res: Response) {
	try {
		const languages = await listService.getUsedLanguages();

		res.status(200).json(languages);
	}
	catch (error) {
		res.status(500).json({ error });
	}
}
