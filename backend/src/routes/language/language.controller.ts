import type { Request, Response } from "express";

import { LanguageInputSchema } from "../../libs/zod-schemas/language.schema.js";
import * as languageService from "../../services/language.service.js";

export async function getLanguages(_req: Request, res: Response) {
	try {
		const received = await languageService.getLanguages();
		res.status(200).json(received);
	}
	catch (error) {
		res.status(500).json({ error: String(error) });
	}
}

export async function getLanguage(req: Request, res: Response) {
	try {
		const { id } = req.params;
		const received = await languageService.getLanguage(id);
		res.status(200).json(received);
	}
	catch (error) {
		res.status(500).json({ error: String(error) });
	}
}

export async function createLanguage(req: Request, res: Response) {
	try {
		const { data: validatedData, success, error } = LanguageInputSchema.safeParse(req.body);

		if (!success) {
			res.status(400).json({ error: error.errors });
			return;
		}

		const created = await languageService.createLanguage(validatedData);
		res.status(201).json(created);
	}
	catch (error) {
		res.status(500).json({ error: String(error) });
	}
}

export async function updateLanguage(req: Request, res: Response) {
	try {
		const { id } = req.params;
		if (!id) {
			res.status(400).json({ error: "Language id is required" });
			return;
		}

		const { data: validatedData, success, error } = LanguageInputSchema.partial().safeParse(req.body);

		if (!success) {
			res.status(400).json({ error: error.errors });
			return;
		}

		const updated = await languageService.updateLanguage(id, validatedData);
		res.status(200).json(updated);
	}
	catch (error) {
		res.status(500).json({ error: String(error) });
	}
}

export async function deleteLanguage(req: Request, res: Response) {
	try {
		const { id } = req.params;
		if (!id) {
			res.status(400).json({ error: "Language id is required" });
			return;
		}

		await languageService.deleteLanguage(id);
		res.status(204).send();
	}
	catch (error) {
		res.status(500).json({ error: String(error) });
	}
}
