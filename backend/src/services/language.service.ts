import type { LanguageDocLeanType, LanguageDocType, LanguageInputSchemaType } from "../libs/types/language.type";

import { LanguageReadySchema } from "../libs/zod-schemas/language.schema.js";
import { LanguageModel } from "../routes/language/language.model.js";
import { formatError } from "../utils/format-error.js";

export async function createLanguage(languageInput: LanguageInputSchemaType): Promise<LanguageDocType> {
	try {
		if (!languageInput) {
			throw new Error("No language provided");
		}

		const validatedData = await LanguageReadySchema.parseAsync(languageInput);
		const languageDoc = new LanguageModel(validatedData);
		const languageDocSaved = await languageDoc.save();

		return languageDocSaved;
	}
	catch (error) {
		throw new Error(formatError(error));
	}
}

export async function getLanguage(languageId: string): Promise<LanguageDocLeanType> {
	try {
		if (!languageId) {
			throw new Error("No id provided");
		}

		const languageModel = await LanguageModel.findById(languageId).lean();

		if (!languageModel) {
			throw new Error("Language does not exist!");
		}

		return languageModel;
	}
	catch (error) {
		throw new Error(formatError(error));
	}
}

export async function getLanguages(): Promise<LanguageDocLeanType[]> {
	try {
		const languageModels = await LanguageModel.find().lean();

		return languageModels;
	}
	catch (error) {
		throw new Error(formatError(error));
	}
}

export async function deleteAllLanguages(): Promise<void> {
	try {
		await LanguageModel.deleteMany();
	}
	catch (error) {
		throw new Error(formatError(error));
	}
}
