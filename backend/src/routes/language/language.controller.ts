import type { Request, Response } from "express";

import { LanguageInputSchema } from "../../libs/zod-schemas/language.schema";
import * as languageService from "../../services/language.service";

export async function createLanguage(req: Request, res: Response) {
	try {
		const data = req.body;
		const { data: validatedData, success, error } = LanguageInputSchema.safeParse(data);

		if (!success) {
			const errorMessage = error.errors;

			// eslint-disable-next-line no-console
			console.log({ error: errorMessage });

			res.status(400).json({ error: errorMessage });

			return;
		}

		const created = await languageService.createLanguage(validatedData);

		res.status(201).json(created);
	}
	catch (error) {
		res.status(500).json({ error });
	}
}

export async function getLanguage(req: Request, res: Response) {
	try {
		const { id } = req.params;
		const received = await languageService.getLanguage(id);

		res.status(200).json(received);
	}
	catch (error) {
		res.status(500).json({ error });
	}
}

export async function getLanguages(req: Request, res: Response) {
	try {
		const received = await languageService.getLanguages();

		res.status(200).json(received);
	}
	catch (error) {
		res.status(500).json({ error });
	}
}

export async function deleteAllLanguages(req: Request, res: Response) {
	try {
		await languageService.deleteAllLanguages();

		res.status(200);
	}
	catch (error) {
		res.status(500).json({ error });
	}
}
