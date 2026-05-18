import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle
} from "@shared/design-system/empty";
import {
	TableBody,
	TableCell,
	TableRow
} from "@shared/design-system/table";

interface RoomTableDataBodyEmptyProps {
	columnCount: number;
}

export default function RoomTableDataBodyEmpty({ columnCount }: RoomTableDataBodyEmptyProps) {
	return (
		<TableBody>
			<TableRow className="border-0 hover:bg-transparent">
				<TableCell colSpan={columnCount} className="h-[60vh] min-h-[300px] align-middle border-0 p-6">
					<Empty>
						<EmptyHeader>
							<EmptyTitle>No rooms found</EmptyTitle>
							<EmptyDescription>There are no topic rooms yet.</EmptyDescription>
						</EmptyHeader>
						<EmptyContent />
					</Empty>
				</TableCell>
			</TableRow>
		</TableBody>
	);
}
