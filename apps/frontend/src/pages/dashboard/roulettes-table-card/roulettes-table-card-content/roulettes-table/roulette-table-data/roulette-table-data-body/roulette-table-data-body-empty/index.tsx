import { Button } from "@shared/design-system/button";
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

import { useRoulettesTableCardStore } from "../../../../../store";

interface RouletteTableDataBodyEmptyProps {
	columnCount: number;
}

export default function RouletteTableDataBodyEmpty({ columnCount }: RouletteTableDataBodyEmptyProps) {
	const { setCreateDialogOpen } = useRoulettesTableCardStore();

	return (
		<TableBody>
			<TableRow className="border-0 hover:bg-transparent">
				<TableCell colSpan={columnCount} className="h-[60vh] min-h-[300px] align-middle border-0 p-6">
					<Empty>
						<EmptyHeader>
							<EmptyTitle>No roulettes found</EmptyTitle>
							<EmptyDescription>Create a roulette to get started.</EmptyDescription>
						</EmptyHeader>
						<EmptyContent>
							<Button variant="secondary" onClick={() => setCreateDialogOpen(true)}>
								Add Roulette
							</Button>
						</EmptyContent>
					</Empty>
				</TableCell>
			</TableRow>
		</TableBody>
	);
}
