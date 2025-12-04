import type { ComboboxValueType } from "@/components/ui/combobox";

import type { LanguageType } from "../types/language";

export const convertListToComboboxValues = <T extends object>(list: T): ComboboxValueType[] => {
	return Object.values(list).map(listItem => ({ value: listItem.value, label: listItem.label }));
};

export const convertLanguageListToComboboxList = (languageList: LanguageType[]): ComboboxValueType[] => {
	return languageList.map(language => ({ value: language._id, label: language.name }));
};
