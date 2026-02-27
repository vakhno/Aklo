import type { ColumnDef } from "@tanstack/react-table";

import { Pencil, Trash2, Users } from "lucide-react";

import type { LanguageType } from "@/lib/types/language";
import type { RouletteType } from "@/lib/types/roulette";

import { Button } from "@/components/ui/button";

interface RouletteTableColumnsOptions {
	onEdit: (roulette: RouletteType) => void;
	onDelete: (roulette: RouletteType) => void;
	onUsers: (rouletteId: string) => void;
}

export const getColumns = ({ onEdit, onDelete, onUsers }: RouletteTableColumnsOptions): ColumnDef<RouletteType>[] => [
	{
		accessorKey: "_id",
		header: "Id",
		size: 260
	},
	{
		id: "language",
		accessorFn: row => typeof row.language === "object" ? (row.language as LanguageType).name : "",
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
				<Button variant="outline" size="icon" onClick={() => onUsers(row.original._id)} title="View users">
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
