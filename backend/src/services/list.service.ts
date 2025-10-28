import type { CategoriesType, CategoryKeyType, LanguageKeyType, LanguagesType } from "../libs/types/list.type";

import redisClient from "../configs/redis.config";
import { CATEGORY_LIST } from "../libs/constants/category-list";
import { LANGUAGE_LIST } from "../libs/constants/language-list";

export async function getUsedCategories(): Promise<CategoriesType> {
	try {
		const result = await redisClient.sendCommand([
			"FT.AGGREGATE",
			"rooms_idx",
			"*",
			"GROUPBY",
			"1",
			"@category",
			"REDUCE",
			"COUNT",
			"0",
			"AS",
			"count",
		]);

		if (!Array.isArray(result)) {
			throw new TypeError("Unexpected FT.SEARCH response");
		}

		const total = result[0];
		const usedCategories = {} as CategoriesType;

		if (total >= 1) {
			result.forEach((item) => {
				if (Array.isArray(item)) {
					const key = item[1] as CategoryKeyType;

					usedCategories[key] = CATEGORY_LIST[key];
				}
			});
		}

		return usedCategories;
	}
	catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);

		throw new Error("Get categories service error!");
	}
}

export async function getUsedLanguages(): Promise<LanguagesType> {
	try {
		const result = await redisClient.sendCommand([
			"FT.AGGREGATE",
			"rooms_idx",
			"*",
			"GROUPBY",
			"1",
			"@language",
			"REDUCE",
			"COUNT",
			"0",
			"AS",
			"count",
		]);

		if (!Array.isArray(result)) {
			throw new TypeError("Unexpected FT.AGGREGATE response");
		}

		const total = result[0];
		const usedLanguages = {} as LanguagesType;

		if (total >= 1) {
			result.forEach((item) => {
				if (Array.isArray(item)) {
					const key = item[1] as LanguageKeyType;

					usedLanguages[key] = LANGUAGE_LIST[key];
				}
			});
		}

		return usedLanguages;
	}
	catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);

		throw new Error("Get languages service error!");
	}
}

export async function getExistLanguages(): Promise<LanguagesType> {
	try {
		const result = await redisClient.sendCommand([
			"FT.AGGREGATE",
			"roulettes_idx",
			"*",
			"GROUPBY",
			"1",
			"@language",
			"REDUCE",
			"COUNT",
			"0",
			"AS",
			"count",
		]);

		if (!Array.isArray(result)) {
			throw new TypeError("Unexpected FT.AGGREGATE response");
		}

		const total = result[0];
		const existLanguages = {} as LanguagesType;

		if (total >= 1) {
			result.forEach((item) => {
				if (Array.isArray(item)) {
					const key = item[1] as LanguageKeyType;

					existLanguages[key] = LANGUAGE_LIST[key];
				}
			});
		}

		return existLanguages;
	}
	catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);

		throw new Error("Get exist languages service error!");
	}
}
