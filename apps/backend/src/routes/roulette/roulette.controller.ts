import type { Request, Response } from "express";

import * as rouletteService from "@shared/mongo/services/roulette.service";
import * as rouletteCacheService from "@shared/redis/services/roulette-cache.service";
import { createRouletteCache } from "@shared/redis/services/roulette-cache.service";
import { RouletteInputSchema } from "@shared/schemas/roulette";

import { parseGetAllRoulettesQueries } from "../../utils/parse-get-all-roulettes-queries.js";

export async function updateRoulette(req: Request, res: Response) {
	try {
		const { id } = req.params;
		if (!id) {
			res.status(400).json({ error: "Roulette id is required" });
			return;
		}

		const updated = await rouletteService.updateRoulette(String(id), req.body);
		res.status(200).json(updated);
	}
	catch (error) {
		res.status(500).json({ error: String(error) });
	}
}

export async function getRouletteUsers(req: Request, res: Response) {
	try {
		const { id } = req.params;
		if (!id) {
			res.status(400).json({ error: "Roulette id is required" });
			return;
		}

		const socketIds = await rouletteCacheService.getRouletteAvailableUsersList(String(id));
		res.status(200).json({ users: socketIds });
	}
	catch (error) {
		res.status(500).json({ error: String(error) });
	}
}

export async function removeRouletteUser(req: Request, res: Response) {
	try {
		const { id, userId: socketId } = req.params;
		if (!id || !socketId) {
			res.status(400).json({ error: "Roulette id and socket id are required" });
			return;
		}

		await rouletteCacheService.leftRouletteCache(String(id), String(socketId));

		const io = req.app.get("io");
		const rouletteNamespace = io.of("/roulette");
		rouletteNamespace.to(socketId).emit("admin-roulette-kick");

		res.status(200).json({ success: true });
	}
	catch (error) {
		res.status(500).json({ error: String(error) });
	}
}

export async function createRoulette(req: Request, res: Response) {
	try {
		const data = req.body;
		const { data: parsedData, success, error } = RouletteInputSchema.safeParse(data);

		if (!success) {
			const errorMessage = error.issues;

			// eslint-disable-next-line no-console
			console.log({ error: errorMessage });

			res.status(400).json({ error: errorMessage });

			return;
		}

		const createdRoulette = await rouletteService.createRoulette(parsedData);
		const { _id } = createdRoulette;

		await createRouletteCache(String(_id));

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

		const roulette = await rouletteService.getRoulette(String(id));

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

		await rouletteService.resetRoulette(String(id));
		await rouletteCacheService.resetRouletteCache(String(id));

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

		await rouletteService.deleteRoulette(String(id));
		await rouletteCacheService.deleteRouletteCache(String(id));

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

		await rouletteService.joinRoulette(String(id));

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

		await rouletteService.leftRoulette(String(id));

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
