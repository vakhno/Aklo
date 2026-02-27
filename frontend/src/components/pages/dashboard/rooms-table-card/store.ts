import { create } from "zustand";

import type { RoomType } from "@/lib/types/room";

interface RoomsTableCardState {
	editDialogOpen: boolean;
	usersDialogOpen: boolean;
	deleteDialogOpen: boolean;
	editingRoom: RoomType | null;
	selectedRoomId: string;
	setEditDialogOpen: (value: boolean) => void;
	setUsersDialogOpen: (value: boolean) => void;
	setDeleteDialogOpen: (value: boolean) => void;
	setEditingRoom: (room: RoomType | null) => void;
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
