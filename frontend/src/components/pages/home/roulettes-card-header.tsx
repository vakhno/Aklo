import type { FilterRouletteSchemaType } from "@/lib/types/roulette";

import RoulettesCardHeaderFilters from "@/components/pages/home/roulettes-card-header-filters";
import { CardHeader, CardTitle } from "@/components/ui/card";

interface RoulettesCardHeaderProps {
	onHandleFilterChange: (data: FilterRouletteSchemaType) => void;
}

const RoulettesCardHeader = ({ onHandleFilterChange }: RoulettesCardHeaderProps) => {
	return (
		<CardHeader className="flex flex-col">
			<CardTitle>CHAT ROULETTES</CardTitle>
			<RoulettesCardHeaderFilters className="w-full" onHandleChange={onHandleFilterChange} />
		</CardHeader>
	);
};

export default RoulettesCardHeader;
