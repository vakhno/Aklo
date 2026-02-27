import { useState } from "react";

import type { UserType } from "@/lib/types/user";

import { useAdminGetUsers } from "@/queries/user";

import { getColumns } from "./user-table-columns";
import UserDataTable from "./user-table-data";
import UserTableDeleteDialog from "./user-table-delete-dialog";
import UserTableEditDialog from "./user-table-edit-dialog";

export default function UsersTable() {
	const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

	const { data: users = [], isLoading } = useAdminGetUsers();
	const isTableEmpty = !users.length;

	const handleEdit = (user: UserType) => {
		setSelectedUser(user);
		setIsEditDialogOpen(true);
	};

	const handleDelete = (user: UserType) => {
		setSelectedUser(user);
		setIsDeleteDialogOpen(true);
	};

	const columns = getColumns({ onEdit: handleEdit, onDelete: handleDelete });

	return (
		<>
			<UserDataTable
				columns={columns}
				data={users}
				isLoading={isLoading}
				isEmpty={isTableEmpty}
			/>

			{isEditDialogOpen && selectedUser && (
				<UserTableEditDialog
					isOpen={isEditDialogOpen}
					setIsOpen={setIsEditDialogOpen}
					defaultValues={selectedUser}
				/>
			)}

			{isDeleteDialogOpen && selectedUser && (
				<UserTableDeleteDialog
					isOpen={isDeleteDialogOpen}
					setIsOpen={setIsDeleteDialogOpen}
					defaultValues={selectedUser}
				/>
			)}
		</>
	);
}
