import type { Language, LanguageKey } from "@/lib/types/language";

import { LANGUAGE_LIST } from "@/lib/constants/language-list";

export const getLanguageByKey = (key: LanguageKey): Language | null => {
	return LANGUAGE_LIST[key] || null;
};
