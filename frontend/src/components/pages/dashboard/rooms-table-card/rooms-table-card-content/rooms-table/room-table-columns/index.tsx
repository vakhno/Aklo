import type { ColumnDef } from "@tanstack/react-table";

import { Pencil, Trash2, Users } from "lucide-react";

import type { LanguageType } from "@/lib/types/language";
import type { RoomType } from "@/lib/types/room";

import { Button } from "@/components/ui/button";

interface RoomTableColumnsOptions {
	onEdit: (room: RoomType) => void;
	onDelete: (room: RoomType) => void;
	onUsers: (roomId: string) => void;
}

export const getColumns = ({ onEdit, onDelete, onUsers }: RoomTableColumnsOptions): ColumnDef<RoomType>[] => [
	{
		accessorKey: "_id",
		header: "Id",
		size: 260
	},
	{
		accessorKey: "title",
		header: "Title",
		size: 200
	},
	{
		id: "language",
		accessorFn: row => typeof row.language === "object" ? (row.language as LanguageType).name : "",
		header: "Language",
		size: 120
	},
	{
		accessorKey: "activeUsersCount",
		header: "Active",
		size: 80,
		cell: ({ row }) => (
			<span>
				{row.original.activeUsersCount}
				/
				{row.original.maxUsersCount}
			</span>
		)
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
				<Button variant="ghost" size="icon" onClick={() => onUsers(row.original._id)} title="View users">
					<Users className="h-4 w-4" />
				</Button>
				<Button variant="ghost" size="icon" onClick={() => onEdit(row.original)}>
					<Pencil className="h-4 w-4" />
				</Button>
				<Button variant="ghost" size="icon" onClick={() => onDelete(row.original)}>
					<Trash2 className="h-4 w-4 text-destructive" />
				</Button>
			</div>
		)
	}
];
