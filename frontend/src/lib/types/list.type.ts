import type { LANGUAGE_LIST } from "@/lib/constants/language-list";

import type { CATEGORY_LIST } from "../constants/category-list";

export type CategoryKeyType = keyof typeof CATEGORY_LIST;

export type CategoriesType = Record<CategoryKeyType, typeof CATEGORY_LIST[CategoryKeyType]>;

export type LanguageKeyType = keyof typeof LANGUAGE_LIST;

export type LanguagesType = Record<LanguageKeyType, typeof LANGUAGE_LIST[LanguageKeyType]>;
