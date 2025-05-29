import type { CATEGORY_LIST } from "../constants/category-list";

export interface Category {
	id: string;
	name: string;
}

export type CategoryKey = keyof typeof CATEGORY_LIST;

export type Categories = {
	[K in CategoryKey]: {
		id: K;
		name: string;
	}
};
