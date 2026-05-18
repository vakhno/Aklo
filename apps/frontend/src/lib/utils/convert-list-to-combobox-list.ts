import type { ComboboxValueType } from "@shared/design-system/combobox";
import type { LanguageDocLeanType } from "@shared/mongo/types/language";

export const convertListToComboboxValues = <T extends object>(list: T): ComboboxValueType[] => {
	return Object.values(list).map(listItem => ({ value: listItem.value, label: listItem.label }));
};

export const convertLanguageListToComboboxList = (languageList: LanguageDocLeanType[]): ComboboxValueType[] => {
	return languageList.map(language => ({ value: String(language._id), label: language.name }));
};
