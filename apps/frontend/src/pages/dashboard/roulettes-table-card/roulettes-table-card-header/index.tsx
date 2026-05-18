import { Button } from "@shared/design-system/button";
import { CardDescription, CardHeader } from "@shared/design-system/card";

import { useRoulettesTableCardStore } from "../store";

export default function RoulettesTableCardHeader() {
	const { setCreateDialogOpen } = useRoulettesTableCardStore();

	return (
		<CardHeader className="flex w-full flex-col">
			<div className="flex w-full items-center justify-between gap-2">
				<div className="flex flex-col gap-2">
					<h2 className="font-semibold leading-none">Roulettes</h2>
					<CardDescription>
						Create, edit, or remove roulettes and manage roulette users.
					</CardDescription>
				</div>
				<Button variant="secondary" onClick={() => setCreateDialogOpen(true)}>
					Create
				</Button>
			</div>
		</CardHeader>
	);
}
