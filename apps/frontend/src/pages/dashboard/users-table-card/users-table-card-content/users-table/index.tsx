import type { ClientSessionUser } from "@shared/auth/types";

import { useAdminGetUsers } from "@shared/queries";
import { useState } from "react";

import { getColumns } from "./user-table-columns";
import UserDataTable from "./user-table-data";
import UserTableDeleteDialog from "./user-table-delete-dialog";
import UserTableEditDialog from "./user-table-edit-dialog";

export default function UsersTable() {
	const [selectedUser, setSelectedUser] = useState<ClientSessionUser | null>(null);
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

	const { data: users = [], isLoading } = useAdminGetUsers({
		apiBaseUrl: import.meta.env.VITE_API_URL
	});
	const isTableEmpty = !users.length;

	const handleEdit = (user: ClientSessionUser) => {
		setSelectedUser(user);
		setIsEditDialogOpen(true);
	};

	const handleDelete = (user: ClientSessionUser) => {
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
