import type { VirtualItem } from "@tanstack/react-virtual";
import type { RefObject } from "react";

import { type Cell, flexRender, type Row, type Table as TanstackTable } from "@tanstack/react-table";

import {
	TableBody,
	TableCell,
	TableRow
} from "@/components/ui/table";

interface LanguageTableDataBodyProps<TData> {
	table: TanstackTable<TData>;
	tableContainerRef: RefObject<HTMLDivElement | null>;
	rows: Row<TData>[];
	virtualItems: VirtualItem[];
	totalSize: number;
}

export default function LanguageTableDataBody<TData>({
	virtualItems,
	totalSize,
	rows
}: LanguageTableDataBodyProps<TData>) {
	return (
		<TableBody style={{ position: "relative", height: `${totalSize}px`, display: "flex" }}>
			{virtualItems.map((virtualRow) => {
				const row = rows[virtualRow.index];
				return (
					<TableRow
						key={row.id}
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							width: "100%",
							height: `${virtualRow.size}px`,
							transform: `translateY(${virtualRow.start}px)`,
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between"
						}}
					>
						{row.getVisibleCells().map((cell: Cell<TData, unknown>) => (
							<TableCell
								key={cell.id}
								style={{
									width: cell.column.getSize(),
									minWidth: cell.column.getSize(),
									flexShrink: 0
								}}
							>
								{flexRender(cell.column.columnDef.cell, cell.getContext())}
							</TableCell>
						))}
					</TableRow>
				);
			})}
		</TableBody>
	);
}
