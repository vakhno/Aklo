import type { LANGUAGE_LIST } from "@/lib/constants/language-list";

export type LanguageKeyType = keyof typeof LANGUAGE_LIST;

export type LanguagesType = Record<LanguageKeyType, typeof LANGUAGE_LIST[LanguageKeyType]>;
