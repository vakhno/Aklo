import type { ComboboxValueType } from "@/components/ui/combobox";

import type { LanguageType } from "../types/language";

export const convertLanguageListToComboboxList = (languageList: LanguageType[]): ComboboxValueType[] => {
	return languageList.map(language => ({ value: language._id, label: language.name }));
};
