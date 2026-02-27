import type { ColumnDef } from "@tanstack/react-table";

import { Pencil, Trash2 } from "lucide-react";

import type { LanguageType } from "@/lib/types/language";

import { Button } from "@/components/ui/button";

interface ColumnsOptions {
	onEdit: (language: LanguageType) => void;
	onDelete: (language: LanguageType) => void;
}

export const getColumns = ({ onEdit, onDelete }: ColumnsOptions): ColumnDef<LanguageType>[] =>
	[
		{
			accessorKey: "_id",
			header: "Id",
			size: 260
		},
		{
			accessorKey: "name",
			header: "Name",
			size: 150
		},
		{
			accessorKey: "nativeName",
			header: "Native Name",
			size: 150
		},
		{
			accessorKey: "code",
			header: "Code",
			size: 100
		},
		{
			accessorKey: "locale",
			header: "Locale",
			size: 100
		},
		{
			id: "actions",
			header: "Actions",
			size: 100,
			cell: ({ row }) => (
				<div className="flex gap-1">
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
