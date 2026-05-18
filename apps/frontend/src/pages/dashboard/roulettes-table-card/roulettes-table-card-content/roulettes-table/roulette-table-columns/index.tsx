import type { LanguageDocLeanType } from "@shared/mongo/types/language";
import type { RouletteDocLeanPopulatedType } from "@shared/mongo/types/roulette";
import type { ColumnDef } from "@tanstack/react-table";

import { Button } from "@shared/design-system/button";
import { Pencil, Trash2, Users } from "lucide-react";

interface RouletteTableColumnsOptions {
	onEdit: (roulette: RouletteDocLeanPopulatedType) => void;
	onDelete: (roulette: RouletteDocLeanPopulatedType) => void;
	onUsers: (rouletteId: string) => void;
}

export const getColumns = ({ onEdit, onDelete, onUsers }: RouletteTableColumnsOptions): ColumnDef<RouletteDocLeanPopulatedType>[] => [
	{
		accessorKey: "_id",
		header: "Id",
		size: 260
	},
	{
		id: "language",
		accessorFn: row => typeof row.language === "object" ? (row.language as LanguageDocLeanType).name : "",
		header: "Language",
		size: 150
	},
	{
		accessorKey: "priority",
		header: "Priority",
		size: 100
	},
	{
		accessorKey: "activeUsersCount",
		header: "Active Users",
		size: 120
	},
	{
		accessorKey: "isCameraRequired",
		header: "Camera",
		size: 80,
		cell: ({ row }) => (row.original.isCameraRequired ? "Yes" : "No")
	},
	{
		accessorKey: "isMicRequired",
		header: "Mic",
		size: 80,
		cell: ({ row }) => (row.original.isMicRequired ? "Yes" : "No")
	},
	{
		id: "actions",
		header: "Actions",
		size: 140,
		cell: ({ row }) => (
			<div className="flex gap-1">
				<Button variant="outline" size="icon" onClick={() => onUsers(String(row.original._id))} title="View users">
					<Users className="h-4 w-4" />
				</Button>
				<Button variant="outline" size="icon" onClick={() => onEdit(row.original)}>
					<Pencil className="h-4 w-4" />
				</Button>
				<Button variant="destructive" size="icon" onClick={() => onDelete(row.original)}>
					<Trash2 className="h-4 w-4" />
				</Button>
			</div>
		)
	}
];
