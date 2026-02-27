import { flexRender, type Table as TanstackTable } from "@tanstack/react-table";

import {
	TableHead,
	TableHeader,
	TableRow
} from "@/components/ui/table";

interface LanguageTableDataHeaderProps<TData> {
	table: TanstackTable<TData>;
}

export default function LanguageTableDataHeader<TData>({ table }: LanguageTableDataHeaderProps<TData>) {
	return (
		<TableHeader className="sticky top-0 z-10 bg-background">
			{table.getHeaderGroups().map(headerGroup => (
				<TableRow key={headerGroup.id} style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
					{headerGroup.headers.map((header) => {
						return (
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
									: flexRender(
											header.column.columnDef.header,
											header.getContext()
										)}
							</TableHead>
						);
					})}
				</TableRow>
			))}
		</TableHeader>
	);
}
