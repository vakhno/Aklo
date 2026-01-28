import { Users } from "lucide-react";

import type { FilterRouletteSchemaType } from "@/lib/types/roulette";

import { Badge } from "@/components/ui/badge";
import { CardDescription, CardHeader } from "@/components/ui/card";

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
			<h2 className="leading-none font-semibold">
				Language Roulettes
			</h2>
			<CardDescription>
				Practice your target language with random partners through video chat roulette.
				Each roulette focuses on a specific language - select one, get matched instantly,
				and start a real conversation.
			</CardDescription>
			<Badge variant="secondary" className="gap-1" aria-label={`${totalActiveUsers} users currently online`}>
				<Users className="h-3 w-3" aria-hidden="true" />
				<span>{totalActiveUsers}</span>
				{" "}
				<span>online</span>
			</Badge>
			<RoulettesCardHeaderFilters className="w-full" onHandleChange={onHandleFilterChange} />
		</CardHeader>
	);
};

export default RoulettesCardHeader;
