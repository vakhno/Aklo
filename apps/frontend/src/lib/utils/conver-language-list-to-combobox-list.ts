import type { ComboboxValueType } from "@shared/design-system/combobox";
import type { LanguageDocLeanType } from "@shared/mongo/types/language";

export const convertLanguageListToComboboxList = (languageList: LanguageDocLeanType[]): ComboboxValueType[] => {
	return languageList.map(language => ({ value: String(language._id), label: language.name }));
};
