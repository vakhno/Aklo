import type { ComboboxValueType } from "@/components/ui/combobox";

export const convertListToComboboxValues = <T extends object>(list: T): ComboboxValueType[] => {
	return Object.values(list).map(listItem => ({ value: listItem.value, label: listItem.label }));
};
