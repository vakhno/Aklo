import type { Request, Response } from "express";

import * as rouletteService from "../services/roulette.service";

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
		const { roulettes } = await rouletteService.getAllRoulettes();

		res.status(200).json({ roulettes });
	}
	catch (error) {
		res.status(500).json({ error });
	}
}
