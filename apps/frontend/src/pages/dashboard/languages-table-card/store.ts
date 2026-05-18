import { create } from "zustand";

interface LanguagesTableCardState {
	isCreateLanguageDialogOpen: boolean;
	setIsCreateLanguageDialog: (value: boolean) => void;
}

export const useLanguagesTableCardStore = create<LanguagesTableCardState>(set => ({
	isCreateLanguageDialogOpen: false,
	setIsCreateLanguageDialog: value => set({ isCreateLanguageDialogOpen: value })
}));
