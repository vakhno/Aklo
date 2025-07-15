import { useQuery } from "@tanstack/react-query";

import type { CategoriesType, LanguagesType } from "@/lib/types/list.type";

const getUsedCategories = async (): Promise<CategoriesType> => {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/list/used-categories`, {
		method: "GET"
	});

	if (!response.ok) {
		throw new Error("Failed to fetch categories1");
	}

	const result = await response.json() as CategoriesType;

	return result;
};

const getUsedLanguages = async (): Promise<LanguagesType> => {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/list/used-languages`, {
		method: "GET"
	});

	if (!response.ok) {
		throw new Error("Failed to fetch languages!");
	}
	const result = await response.json() as LanguagesType;

	return result;
};

export const useUsedCategories = () => {
	return useQuery({
		queryKey: ["used-categories"],
		initialData: {} as CategoriesType,
		queryFn: getUsedCategories
	});
};

export const useUsedLanguages = () => {
	return useQuery({
		queryKey: ["used-languages"],
		initialData: {} as LanguagesType,
		queryFn: getUsedLanguages
	});
};
