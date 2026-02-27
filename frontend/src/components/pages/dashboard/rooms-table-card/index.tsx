import { Card } from "@/components/ui/card";

import RoomsTableCardContent from "./rooms-table-card-content";
import RoomsTableCardHeader from "./rooms-table-card-header";

export default function RoomsTableCard() {
	return (
		<Card>
			<RoomsTableCardHeader />
			<RoomsTableCardContent />
		</Card>
	);
}
