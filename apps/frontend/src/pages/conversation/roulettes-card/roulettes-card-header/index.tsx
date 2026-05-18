import type { FilterRouletteSchemaType } from "@shared/schemas/filter-roulette";

import { Badge } from "@shared/design-system/badge";
import { CardDescription, CardHeader } from "@shared/design-system/card";
import { Users } from "lucide-react";

import RoulettesCardHeaderFilters from "./roulettes-card-header-filters";

interface RoulettesCardHeaderProps {
	onHandleFilterChange: (data: FilterRouletteSchemaType) => void;
	totalActiveUsers?: number;
}

const RoulettesCardHeader = ({
	onHandleFilterChange,
	totalActiveUsers
}: RoulettesCardHeaderProps) => {
	return (
		<CardHeader className="flex flex-col">
			<Badge variant="secondary" className="gap-2" aria-label={`${totalActiveUsers} users currently online`}>
				<Users size={4} aria-hidden="true" />
				<span>Online</span>
				{" "}
				<strong>{totalActiveUsers}</strong>
			</Badge>
			<h2>
				Language Roulettes
			</h2>
			<CardDescription>
				Practice your target language with random partners through video chat roulette.
				Each roulette focuses on a specific language - select one, get matched instantly,
				and start a real conversation.
			</CardDescription>
			<RoulettesCardHeaderFilters className="w-full" onHandleChange={onHandleFilterChange} />
		</CardHeader>
	);
};

export default RoulettesCardHeader;
