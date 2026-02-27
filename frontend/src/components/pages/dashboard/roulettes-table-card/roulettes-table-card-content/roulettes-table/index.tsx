import { useCallback, useState } from "react";

import type { RouletteType } from "@/lib/types/roulette";

import { Input } from "@/components/ui/input";
import { useAdminGetRoulettes } from "@/queries/roulette";

import { useRoulettesTableCardStore } from "../../store";
import { getColumns } from "./roulette-table-columns";
import RouletteTableCreateDialog from "./roulette-table-create-dialog";
import RouletteDataTable from "./roulette-table-data";
import RouletteTableDeleteDialog from "./roulette-table-delete-dialog";
import RouletteTableEditDialog from "./roulette-table-edit-dialog";
import RouletteUsersDialog from "./roulette-users-dialog";

export default function RoulettesTable() {
	const [globalFilter, setGlobalFilter] = useState("");

	const { data: roulettes = [], isLoading } = useAdminGetRoulettes();
	const isTableEmpty = !roulettes.length;
	const {
		createDialogOpen,
		editDialogOpen,
		usersDialogOpen,
		deleteDialogOpen,
		editingRoulette,
		selectedRouletteId,
		setCreateDialogOpen,
		setEditDialogOpen,
		setUsersDialogOpen,
		setDeleteDialogOpen,
		setEditingRoulette,
		setSelectedRouletteId
	} = useRoulettesTableCardStore();

	const handleEdit = useCallback((roulette: RouletteType) => {
		setEditingRoulette(roulette);
		setEditDialogOpen(true);
	}, [setEditingRoulette, setEditDialogOpen]);

	const handleDelete = useCallback((roulette: RouletteType) => {
		setEditingRoulette(roulette);
		setDeleteDialogOpen(true);
	}, [setEditingRoulette, setDeleteDialogOpen]);

	const handleUsers = useCallback((rouletteId: string) => {
		setSelectedRouletteId(rouletteId);
		setUsersDialogOpen(true);
	}, [setSelectedRouletteId, setUsersDialogOpen]);

	const columns = getColumns({ onEdit: handleEdit, onDelete: handleDelete, onUsers: handleUsers });

	return (
		<>
			<div className="flex flex-shrink-0 items-center justify-between gap-4 border-b p-2">
				<Input
					placeholder="Search roulettes..."
					value={globalFilter}
					onChange={e => setGlobalFilter(e.target.value)}
					className="max-w-xs"
				/>
				<span className="text-muted-foreground text-sm">
					{roulettes.length}
					{" "}
					roulettes total
				</span>
			</div>

			<RouletteDataTable
				columns={columns}
				data={roulettes}
				isLoading={isLoading}
				isEmpty={isTableEmpty}
				globalFilter={globalFilter}
				onGlobalFilterChange={setGlobalFilter}
			/>

			{createDialogOpen && (
				<RouletteTableCreateDialog isOpen={createDialogOpen} setIsOpen={setCreateDialogOpen} />
			)}

			{editDialogOpen && editingRoulette && (
				<RouletteTableEditDialog
					isOpen={editDialogOpen}
					setIsOpen={setEditDialogOpen}
					defaultValues={editingRoulette}
				/>
			)}

			{deleteDialogOpen && editingRoulette && (
				<RouletteTableDeleteDialog
					isOpen={deleteDialogOpen}
					setIsOpen={setDeleteDialogOpen}
					defaultValues={editingRoulette}
				/>
			)}

			{usersDialogOpen && (
				<RouletteUsersDialog
					rouletteId={selectedRouletteId}
					open={usersDialogOpen}
					onOpenChange={setUsersDialogOpen}
				/>
			)}
		</>
	);
}
