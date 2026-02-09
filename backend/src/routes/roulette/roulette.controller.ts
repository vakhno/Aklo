import type { Request, Response } from "express";

import { RouletteInputSchema } from "../../libs/zod-schemas/roulette.schema.js";
import * as rouletteCacheService from "../../services/roulette-cache.service.js";
import * as rouletteService from "../../services/roulette.service.js";
import { parseGetAllRoulettesQueries } from "../../utils/parse-get-all-roulettes-queries.js";

export async function createRoulette(req: Request, res: Response) {
	try {
		const data = req.body;
		const { data: parsedData, success, error } = RouletteInputSchema.safeParse(data);

		if (!success) {
			const errorMessage = error.errors;

			// eslint-disable-next-line no-console
			console.log({ error: errorMessage });

			res.status(400).json({ error: errorMessage });

			return;
		}

		const createdRoulette = await rouletteService.createRoulette(parsedData);

		res.status(201).json(createdRoulette);
	}
	catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);

		res.status(500).json({ error });
	}
}

export async function getRoulette(req: Request, res: Response) {
	try {
		const { id } = req.params;

		if (!id) {
			// eslint-disable-next-line no-console
			console.log({ error: "Roulette id is required" });

			res.status(400).json({ error: "Roulette id is required" });

			return;
		}

		const roulette = await rouletteService.getRoulette(id);

		if (!roulette) {
			// eslint-disable-next-line no-console
			console.log({ error: "Roulette not found" });

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
		// eslint-disable-next-line no-console
		console.log(error);

		res.status(500).json({ error });
	}
}

export async function resetAllRoulettes(req: Request, res: Response) {
	try {
		await rouletteService.resetAllRoulettes();
		await rouletteCacheService.resetAllRoulettesCache();

		res.status(200);
	}
	catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);

		res.status(500).json({ error });
	}
}

export async function resetRoulette(req: Request, res: Response) {
	try {
		const { id } = req.params;

		if (!id) {
			// eslint-disable-next-line no-console
			console.log({ error: "Roulette id is required" });

			res.status(400).json({ error: "Roulette id is required" });

			return;
		}

		await rouletteService.resetRoulette(id);
		await rouletteCacheService.resetRouletteCache(id);

		res.status(200);
	}
	catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);

		res.status(500).json({ error });
	}
}

export async function deleteRoulette(req: Request, res: Response) {
	try {
		const { id } = req.params;

		if (!id) {
			// eslint-disable-next-line no-console
			console.log({ error: "Roulette id is required" });

			res.status(400).json({ error: "Roulette id is required" });

			return;
		}

		await rouletteService.deleteRoulette(id);
		await rouletteCacheService.deleteRouletteCache(id);

		res.status(200);
	}
	catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);

		res.status(500).json({ error });
	}
}

export async function deleteAllRoulettes(req: Request, res: Response) {
	try {
		await rouletteService.deleteAllRoulettes();
		await rouletteCacheService.deleteAllRoulettesCache();

		res.status(200);
	}
	catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);

		res.status(500).json({ error });
	}
}

export async function joinRoulette(req: Request, res: Response) {
	try {
		const { id } = req.params;

		if (!id) {
			// eslint-disable-next-line no-console
			console.log({ error: "Roulette id is required" });

			res.status(400).json({ error: "Roulette id is required" });

			return;
		}

		await rouletteService.joinRoulette(id);

		res.status(200);
	}
	catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);

		res.status(500).json({ error });
	}
}

export async function leftRoulette(req: Request, res: Response) {
	try {
		const { id } = req.params;

		if (!id) {
			// eslint-disable-next-line no-console
			console.log({ error: "Roulette id is required" });

			res.status(400).json({ error: "Roulette id is required" });

			return;
		}

		await rouletteService.leftRoulette(id);

		res.status(200);
	}
	catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);

		res.status(500).json({ error });
	}
}

export async function getRoulettesLanguages(req: Request, res: Response) {
	try {
		const roulettesLanguages = await rouletteService.getRoulettesLanguages();

		res.status(200).json(roulettesLanguages);
	}
	catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);

		res.status(500).json({ error });
	}
}
