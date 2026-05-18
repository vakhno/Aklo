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

interface UserTableDataBodyEmptyProps {
	columnCount: number;
}

export default function UserTableDataBodyEmpty({ columnCount }: UserTableDataBodyEmptyProps) {
	return (
		<TableBody>
			<TableRow className="border-0 hover:bg-transparent">
				<TableCell colSpan={columnCount} className="h-[60vh] min-h-[300px] align-middle border-0 p-6">
					<Empty>
						<EmptyHeader>
							<EmptyTitle>No users found</EmptyTitle>
							<EmptyDescription>
								There are no users in the system yet.
							</EmptyDescription>
						</EmptyHeader>
						<EmptyContent />
					</Empty>
				</TableCell>
			</TableRow>
		</TableBody>
	);
}
