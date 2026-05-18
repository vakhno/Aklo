import type { RouletteDocLeanPopulatedType } from "@shared/mongo/types/roulette";

import { create } from "zustand";

interface RoulettesTableCardState {
	createDialogOpen: boolean;
	editDialogOpen: boolean;
	usersDialogOpen: boolean;
	deleteDialogOpen: boolean;
	editingRoulette: RouletteDocLeanPopulatedType | null;
	selectedRouletteId: string;
	setCreateDialogOpen: (value: boolean) => void;
	setEditDialogOpen: (value: boolean) => void;
	setUsersDialogOpen: (value: boolean) => void;
	setDeleteDialogOpen: (value: boolean) => void;
	setEditingRoulette: (roulette: RouletteDocLeanPopulatedType | null) => void;
	setSelectedRouletteId: (id: string) => void;
}

export const useRoulettesTableCardStore = create<RoulettesTableCardState>(set => ({
	createDialogOpen: false,
	editDialogOpen: false,
	usersDialogOpen: false,
	deleteDialogOpen: false,
	editingRoulette: null,
	selectedRouletteId: "",
	setCreateDialogOpen: value => set({ createDialogOpen: value }),
	setEditDialogOpen: value => set({ editDialogOpen: value }),
	setUsersDialogOpen: value => set({ usersDialogOpen: value }),
	setDeleteDialogOpen: value => set({ deleteDialogOpen: value }),
	setEditingRoulette: roulette => set({ editingRoulette: roulette }),
	setSelectedRouletteId: id => set({ selectedRouletteId: id })
}));
