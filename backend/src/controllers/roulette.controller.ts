import type { Request, Response } from "express";

import * as rouletteService from "../services/roulette.service";
import { parseGetAllRoulettesQueries } from "../utils/parse-get-all-roulettes-queries";

export async function getRoulette(req: Request, res: Response) {
	try {
		const { id } = req.params;
		const roulette = await rouletteService.getRoulette(id);

		if (!roulette) {
			res.status(404).json({ error: "Roulette not found" });
			return;
		}

		res.status(200).json(roulette);
	}
	catch (error) {
		res.status(500).json({ error });
	}
}

export async function getAllRoulettes(req: Request, res: Response) {
	try {
		const { language, limit, page } = parseGetAllRoulettesQueries(req);
		const { roulettes, isHasMore } = await rouletteService.getAllRoulettes({
			language,
			limit,
			page,
		});

		res.status(200).json({ roulettes, isHasMore });
	}
	catch (error) {
		res.status(500).json({ error });
	}
}
