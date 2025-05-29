import type { ComboboxValueType } from "@/components/ui/combobox";
import type { Categories } from "@/lib/types/category";

export const convertCategoriesToComboboxValues = (categories: Categories): ComboboxValueType[] => {
	return Object.values(categories).map(category => ({ value: category.id, label: category.name }));
};
