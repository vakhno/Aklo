import { Card } from "@shared/design-system/card";

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
