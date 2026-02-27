import { useCallback, useState } from "react";

import type { RoomType } from "@/lib/types/room";

import { Input } from "@/components/ui/input";
import { useAdminGetRooms } from "@/queries/room";

import { useRoomsTableCardStore } from "../../store";
import { getColumns } from "./room-table-columns";
import RoomDataTable from "./room-table-data";
import RoomTableDeleteDialog from "./room-table-delete-dialog";
import RoomTableEditDialog from "./room-table-edit-dialog";
import RoomUsersDialog from "./room-users-dialog";

export default function RoomsTable() {
	const [globalFilter, setGlobalFilter] = useState("");

	const { data: rooms = [], isLoading } = useAdminGetRooms();
	const isTableEmpty = !rooms.length;
	const {
		editDialogOpen,
		usersDialogOpen,
		deleteDialogOpen,
		editingRoom,
		selectedRoomId,
		setEditDialogOpen,
		setUsersDialogOpen,
		setDeleteDialogOpen,
		setEditingRoom,
		setSelectedRoomId
	} = useRoomsTableCardStore();

	const handleEdit = useCallback((room: RoomType) => {
		setEditingRoom(room);
		setEditDialogOpen(true);
	}, [setEditingRoom, setEditDialogOpen]);

	const handleDelete = useCallback((room: RoomType) => {
		setEditingRoom(room);
		setDeleteDialogOpen(true);
	}, [setEditingRoom, setDeleteDialogOpen]);

	const handleUsers = useCallback((roomId: string) => {
		setSelectedRoomId(roomId);
		setUsersDialogOpen(true);
	}, [setSelectedRoomId, setUsersDialogOpen]);

	const columns = getColumns({ onEdit: handleEdit, onDelete: handleDelete, onUsers: handleUsers });

	return (
		<>
			<div className="flex flex-shrink-0 items-center justify-between gap-4 border-b p-2">
				<Input
					placeholder="Search rooms..."
					value={globalFilter}
					onChange={e => setGlobalFilter(e.target.value)}
					className="max-w-xs"
				/>
				<span className="text-muted-foreground text-sm">
					{rooms.length}
					{" "}
					rooms total
				</span>
			</div>

			<RoomDataTable
				columns={columns}
				data={rooms}
				isLoading={isLoading}
				isEmpty={isTableEmpty}
				globalFilter={globalFilter}
				onGlobalFilterChange={setGlobalFilter}
			/>

			{editDialogOpen && editingRoom && (
				<RoomTableEditDialog
					isOpen={editDialogOpen}
					setIsOpen={setEditDialogOpen}
					defaultValues={editingRoom}
				/>
			)}

			{deleteDialogOpen && editingRoom && (
				<RoomTableDeleteDialog
					isOpen={deleteDialogOpen}
					setIsOpen={setDeleteDialogOpen}
					defaultValues={editingRoom}
				/>
			)}

			{usersDialogOpen && (
				<RoomUsersDialog
					roomId={selectedRoomId}
					open={usersDialogOpen}
					onOpenChange={setUsersDialogOpen}
				/>
			)}
		</>
	);
}
