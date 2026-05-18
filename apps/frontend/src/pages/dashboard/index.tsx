import LanguagesTableCard from "./languages-table-card";
import RoomsTableCard from "./rooms-table-card";
import RoulettesTableCard from "./roulettes-table-card";
import UsersTableCard from "./users-table-card";

export default function DashboardPage() {
	return (
		<main className="flex flex-col gap-4">
			<LanguagesTableCard />
			<RoulettesTableCard />
			<RoomsTableCard />
			<UsersTableCard />
		</main>
	);
}
