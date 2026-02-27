import { Card } from "@/components/ui/card";

import UsersTableCardContent from "./users-table-card-content";
import UsersTableCardHeader from "./users-table-card-header";

export default function UsersTableCard() {
	return (
		<Card>
			<UsersTableCardHeader />
			<UsersTableCardContent />
		</Card>
	);
}
