import { flexRender, type Table as TanstackTable } from "@tanstack/react-table";

import {
	TableHead,
	TableHeader,
	TableRow
} from "@/components/ui/table";

interface RouletteTableDataHeaderProps<TData> {
	table: TanstackTable<TData>;
}

export default function RouletteTableDataHeader<TData>({ table }: RouletteTableDataHeaderProps<TData>) {
	return (
		<TableHeader className="sticky top-0 z-10 bg-background">
			{table.getHeaderGroups().map(headerGroup => (
				<TableRow key={headerGroup.id} style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
					{headerGroup.headers.map(header => (
						<TableHead
							key={header.id}
							style={{
								display: "flex",
								alignItems: "center",
								width: header.getSize()
							}}
						>
							{header.isPlaceholder
								? null
								: flexRender(header.column.columnDef.header, header.getContext())}
						</TableHead>
					))}
				</TableRow>
			))}
		</TableHeader>
	);
}
