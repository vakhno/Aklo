import {
	type ColumnDef,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	useReactTable
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";

import {
	Table
} from "@/components/ui/table";

import LanguageTableDataBody from "./language-table-data-body";
import LanguageTableDataBodyEmpty from "./language-table-data-body-empty";
import LanguageTableDataHeader from "./language-table-data-header";
import LanguageTableDataSkeleton from "./language-table-data-skeleton";

interface DataTableProps<TData, TValue> {
	isLoading: boolean;
	isEmpty: boolean;
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}
const ROW_HEIGHT = 52;
export default function DataTable<TData, TValue>({ isLoading, isEmpty, columns, data }: DataTableProps<TData, TValue>) {
	// refs
	const tableContainerRef = useRef<HTMLTableElement>(null);
	// table
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
			<LanguageTableDataHeader table={table} />
			{ isLoading ? <LanguageTableDataSkeleton /> : <LanguageTableDataBody virtualItems={virtualItems} totalSize={totalSize} rows={rows} table={table} tableContainerRef={tableContainerRef} />}
			{ isEmpty && !isLoading && <LanguageTableDataBodyEmpty /> }
		</Table>
	);
}
