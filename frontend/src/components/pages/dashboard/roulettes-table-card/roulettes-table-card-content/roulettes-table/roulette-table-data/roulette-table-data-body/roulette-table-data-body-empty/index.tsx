import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle
} from "@/components/ui/empty";

import { useRoulettesTableCardStore } from "../../../../../store";

export default function RouletteTableDataBodyEmpty() {
	const { setCreateDialogOpen } = useRoulettesTableCardStore();

	return (
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
	);
}
