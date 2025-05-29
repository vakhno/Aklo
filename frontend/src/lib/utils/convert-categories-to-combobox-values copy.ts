import type { ComboboxValueType } from "@/components/ui/combobox";
import type { Languages } from "@/lib/types/language";

export const convertLanguagesToComboboxValues = (languages: Languages): ComboboxValueType[] => {
	return Object.values(languages).map(language => ({ value: language.id, label: language.name }));
};
