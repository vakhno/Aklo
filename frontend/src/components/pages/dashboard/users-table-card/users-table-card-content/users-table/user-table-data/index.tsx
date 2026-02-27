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

import UserTableDataBody from "./user-table-data-body";
import UserTableDataBodyEmpty from "./user-table-data-body-empty";
import UserTableDataHeader from "./user-table-data-header";
import UserTableDataSkeleton from "./user-table-data-skeleton";

interface UserDataTableProps<TData, TValue> {
	isLoading: boolean;
	isEmpty: boolean;
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

const ROW_HEIGHT = 52;

export default function UserDataTable<TData, TValue>({
	isLoading,
	isEmpty,
	columns,
	data
}: UserDataTableProps<TData, TValue>) {
	const tableContainerRef = useRef<HTMLDivElement>(null);

	const table = useReactTable({
		data,
		columns,
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
			<UserTableDataHeader table={table} />
			{isLoading
				? (
						<UserTableDataSkeleton />
					)
				: (
						<UserTableDataBody
							table={table}
							tableContainerRef={tableContainerRef}
							rows={rows}
							virtualItems={virtualItems}
							totalSize={totalSize}
						/>
					)}
			{isEmpty && !isLoading && <UserTableDataBodyEmpty />}
		</Table>
	);
}
