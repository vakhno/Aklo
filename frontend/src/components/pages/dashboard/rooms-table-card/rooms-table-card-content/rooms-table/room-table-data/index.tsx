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

import RoomTableDataBody from "./room-table-data-body";
import RoomTableDataBodyEmpty from "./room-table-data-body/room-table-data-body-empty";
import RoomTableDataHeader from "./room-table-data-header";
import RoomTableDataSkeleton from "./room-table-data-skeleton";

interface RoomDataTableProps<TData, TValue> {
	isLoading: boolean;
	isEmpty: boolean;
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	globalFilter?: string;
	onGlobalFilterChange?: (value: string) => void;
}

const ROW_HEIGHT = 52;

export default function RoomDataTable<TData, TValue>({
	isLoading,
	isEmpty,
	columns,
	data,
	globalFilter = "",
	onGlobalFilterChange
}: RoomDataTableProps<TData, TValue>) {
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
			<RoomTableDataHeader table={table} />
			{isLoading
				? (
						<RoomTableDataSkeleton />
					)
				: (
						<RoomTableDataBody
							table={table}
							tableContainerRef={tableContainerRef}
							rows={rows}
							virtualItems={virtualItems}
							totalSize={totalSize}
						/>
					)}
			{isEmpty && !isLoading && <RoomTableDataBodyEmpty />}
		</Table>
	);
}
