import type { RoomDocLeanType } from "@shared/mongo/types/room";

import { create } from "zustand";

interface RoomsTableCardState {
	editDialogOpen: boolean;
	usersDialogOpen: boolean;
	deleteDialogOpen: boolean;
	editingRoom: RoomDocLeanType | null;
	selectedRoomId: string;
	setEditDialogOpen: (value: boolean) => void;
	setUsersDialogOpen: (value: boolean) => void;
	setDeleteDialogOpen: (value: boolean) => void;
	setEditingRoom: (room: RoomDocLeanType | null) => void;
	setSelectedRoomId: (id: string) => void;
}

export const useRoomsTableCardStore = create<RoomsTableCardState>(set => ({
	editDialogOpen: false,
	usersDialogOpen: false,
	deleteDialogOpen: false,
	editingRoom: null,
	selectedRoomId: "",
	setEditDialogOpen: value => set({ editDialogOpen: value }),
	setUsersDialogOpen: value => set({ usersDialogOpen: value }),
	setDeleteDialogOpen: value => set({ deleteDialogOpen: value }),
	setEditingRoom: room => set({ editingRoom: room }),
	setSelectedRoomId: id => set({ selectedRoomId: id })
}));
