import { Card } from "@shared/design-system/card";

import RoulettesTableCardContent from "./roulettes-table-card-content";
import RoulettesTableCardHeader from "./roulettes-table-card-header";

export default function RoulettesTableCard() {
	return (
		<Card>
			<RoulettesTableCardHeader />
			<RoulettesTableCardContent />
		</Card>
	);
}
