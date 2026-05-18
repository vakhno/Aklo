import type { ClientSessionUser } from "@shared/auth/types";
import type { ColumnDef } from "@tanstack/react-table";

import { Button } from "@shared/design-system/button";
import { Pencil, Trash2 } from "lucide-react";

interface ColumnsOptions {
	onEdit?: (user: ClientSessionUser) => void;
	onDelete?: (user: ClientSessionUser) => void;
}

export const getColumns = ({ onEdit, onDelete }: ColumnsOptions = {}): ColumnDef<ClientSessionUser>[] => [
	{
		accessorKey: "id",
		header: "Id",
		size: 280
	},
	{
		accessorKey: "name",
		header: "Name",
		size: 200,
		cell: ({ row }) => row.original.name ?? "—"
	},
	{
		accessorKey: "email",
		header: "Email",
		size: 240
	},
	{
		accessorKey: "role",
		header: "Role",
		size: 120,
		cell: ({ row }) => row.original.role ?? "—"
	},
	{
		id: "actions",
		header: "Actions",
		size: 100,
		cell: ({ row }) => (
			<div className="flex gap-1">
				<Button
					variant="outline"
					size="icon"
					onClick={() => onEdit?.(row.original)}
					disabled={!onEdit}
					title="Edit"
				>
					<Pencil className="h-4 w-4" />
				</Button>
				<Button
					variant="destructive"
					size="icon"
					onClick={() => onDelete?.(row.original)}
					disabled={!onDelete}
					title="Delete"
				>
					<Trash2 className="h-4 w-4" />
				</Button>
			</div>
		)
	}
];
