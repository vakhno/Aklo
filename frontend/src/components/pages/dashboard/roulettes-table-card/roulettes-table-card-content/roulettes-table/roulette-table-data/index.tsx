import {
	type ColumnDef,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	useReactTable
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";

import { Table } from "@/components/ui/table";

import RouletteTableDataBody from "./roulette-table-data-body";
import RouletteTableDataBodyEmpty from "./roulette-table-data-body/roulette-table-data-body-empty";
import RouletteTableDataHeader from "./roulette-table-data-header";
import RouletteTableDataSkeleton from "./roulette-table-data-skeleton";

interface RouletteDataTableProps<TData, TValue> {
	isLoading: boolean;
	isEmpty: boolean;
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	globalFilter?: string;
	onGlobalFilterChange?: (value: string) => void;
}

const ROW_HEIGHT = 52;

export default function RouletteDataTable<TData, TValue>({
	isLoading,
	isEmpty,
	columns,
	data,
	globalFilter = "",
	onGlobalFilterChange
}: RouletteDataTableProps<TData, TValue>) {
	const tableContainerRef = useRef<HTMLDivElement>(null);

	const table = useReactTable({
		data,
		columns,
		state: { globalFilter },
		onGlobalFilterChange,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel()
	});

	const { rows } = table.getRowModel();

	const rowVirtualizer = useVirtualizer({
		count: rows.length,
		getScrollElement: () => tableContainerRef.current,
		estimateSize: () => ROW_HEIGHT,
		overscan: 20
	});

	const virtualItems = rowVirtualizer.getVirtualItems();
	const totalSize = rowVirtualizer.getTotalSize();

	return (
		<Table ref={tableContainerRef} className="h-[60vh] min-h-[300px]">
			<RouletteTableDataHeader table={table} />
			{isLoading
				? (
						<RouletteTableDataSkeleton />
					)
				: (
						<RouletteTableDataBody
							table={table}
							tableContainerRef={tableContainerRef}
							rows={rows}
							virtualItems={virtualItems}
							totalSize={totalSize}
						/>
					)}
			{isEmpty && !isLoading && <RouletteTableDataBodyEmpty />}
		</Table>
	);
}
