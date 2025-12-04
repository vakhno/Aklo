import { Types } from "mongoose";

import type { LanguageDocLeanType } from "../libs/types/language.type";
import type { RouletteDocLeanPopulatedType, RouletteDocType, RouletteInputSchemaType, RouletteSchemaType } from "../libs/types/roulette.type";

import { RouletteReadySchema } from "../libs/zod-schemas/roulette.schema";
import { LanguageModel } from "../routes/language/language.model";
import { RouletteModel } from "../routes/roulette/roulette.model";
import { formatError } from "../utils/format-error";
import { createRouletteCache } from "./roulette-cache.service";

export async function createRoulette(rouletteInput: RouletteInputSchemaType): Promise<RouletteDocType> {
	try {
		if (!rouletteInput) {
			throw new Error("No roulette provided");
		}

		const rouletteCount = await RouletteModel.countDocuments();
		const rouletteReadyData = {
			priority: rouletteCount + 1,
			activeUsersCount: 0,
		};
		const validatedData = await RouletteReadySchema.parseAsync({
			...rouletteInput,
			...rouletteReadyData,
		});
		const rouletteDoc = new RouletteModel(validatedData);
		const { _id } = rouletteDoc;
		const rouletteDocSaved = await rouletteDoc.save();

		await createRouletteCache(String(_id));

		return rouletteDocSaved;
	}
	catch (error) {
		throw new Error(formatError(error));
	}
}

export async function getRoulette(rouletteId: string): Promise<RouletteDocLeanPopulatedType> {
	try {
		if (!Types.ObjectId.isValid(rouletteId)) {
			throw new Error("No roulette id");
		}

		const roulettePopulatedLeanModel = await RouletteModel.findById(rouletteId).populate("language").lean() as RouletteDocLeanPopulatedType | null;

		if (!roulettePopulatedLeanModel) {
			throw new Error("Roulette not found");
		}

		return roulettePopulatedLeanModel;
	}
	catch (error) {
		throw new Error(formatError(error));
	}
}

export async function getAllRoulettes({ language, limit, page }: { language?: string; limit: number; page: number }): Promise<{ roulettes: RouletteDocLeanPopulatedType[]; isHasMore: boolean }> {
	try {
		const offset = (page - 1) * limit;
		const rouletteFilters: Partial<RouletteSchemaType> = {};

		if (language) {
			rouletteFilters.language = new Types.ObjectId(language);
		}

		const roulettePopulatedLeanModel = await RouletteModel.find(rouletteFilters)
			.skip(offset)
			.limit(limit)
			.sort({ activeUsersCount: -1, priority: 1 })
			.lean()
			.populate("language") as unknown as RouletteDocLeanPopulatedType[];
		const total = await RouletteModel.countDocuments(rouletteFilters);
		const isHasMore = Number(page) * limit < total;

		return { roulettes: roulettePopulatedLeanModel, isHasMore };
	}
	catch (error) {
		throw new Error(formatError(error));
	}
}

export async function resetAllRoulettes(): Promise<void> {
	try {
		await RouletteModel.updateMany({}, { $set: { activeUsersCount: 0 } });
	}
	catch (error) {
		throw new Error(formatError(error));
	}
}

export async function resetRoulette(rouletteId: string): Promise<void> {
	try {
		if (!Types.ObjectId.isValid(rouletteId)) {
			throw new Error("No roulette id");
		}

		const resetRoulette = await RouletteModel.findByIdAndUpdate(rouletteId, { $set: { activeUsersCount: 0 } }, { new: true });

		if (!resetRoulette) {
			throw new Error("No roulette update");
		}
	}
	catch (error) {
		throw new Error(formatError(error));
	}
}

export async function deleteAllRoulettes(): Promise<void> {
	try {
		await RouletteModel.deleteMany();
	}
	catch (error) {
		throw new Error(formatError(error));
	}
}

export async function deleteRoulette(rouletteId: string): Promise<void> {
	try {
		if (!Types.ObjectId.isValid(rouletteId)) {
			throw new Error("No roulette id");
		}

		const deletedRoulette = await RouletteModel.findByIdAndDelete(rouletteId);

		if (!deletedRoulette) {
			throw new Error("No roulette deleted");
		}
	}
	catch (error) {
		throw new Error(formatError(error));
	}
}

export async function joinRoulette(rouletteId: string): Promise<void> {
	try {
		if (!Types.ObjectId.isValid(rouletteId)) {
			throw new Error("No roulette id");
		}

		const updatedRoulette = await RouletteModel.findByIdAndUpdate(rouletteId, { $inc: { activeUsersCount: 1 } }, { new: true });

		if (!updatedRoulette) {
			throw new Error("Roulette not found");
		}
	}
	catch (error) {
		throw new Error(formatError(error));
	}
}

export async function leftRoulette(rouletteId: string): Promise<void> {
	try {
		if (!Types.ObjectId.isValid(rouletteId)) {
			throw new Error("No roulette id");
		}

		const updateRoulette = await RouletteModel.findByIdAndUpdate(rouletteId, { $inc: { activeUsersCount: -1 } }, { new: true });

		if (!updateRoulette) {
			throw new Error("Roulette not found");
		}
	}
	catch (error) {
		throw new Error(formatError(error));
	}
}

export async function getRoulettesLanguages(): Promise<LanguageDocLeanType[]> {
	try {
		const languageIdList = await RouletteModel.distinct("language");
		const rouletteLanguageList = await LanguageModel.find({ _id: { $in: languageIdList } }).lean();

		return rouletteLanguageList;
	}
	catch (error) {
		throw new Error(formatError(error));
	}
}
