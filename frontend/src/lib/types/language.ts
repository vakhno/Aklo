import type { LANGUAGE_LIST } from "../constants/language-list";

export interface Language {
	id: string;
	name: string;
}

export type LanguageKey = keyof typeof LANGUAGE_LIST;

export type Languages = {
	[K in LanguageKey]: {
		id: K;
		name: string;
	}
};
