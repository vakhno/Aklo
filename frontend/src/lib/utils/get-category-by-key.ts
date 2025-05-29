import type { Category, CategoryKey } from "@/lib/types/category";

import { CATEGORY_LIST } from "@/lib/constants/category-list";

export const getCategoryByKey = (key: CategoryKey): Category | null => {
	return CATEGORY_LIST[key] || null;
};
