import type { FilterRouletteSchemaType } from "@/lib/types/roulette";

import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import RoulettesCardHeaderFilters from "./roulettes-card-header-filters";

interface RoulettesCardHeaderProps {
	onHandleFilterChange: (data: FilterRouletteSchemaType) => void;
}

const RoulettesCardHeader = ({ onHandleFilterChange }: RoulettesCardHeaderProps) => {
	return (
		<CardHeader className="flex flex-col">
			<CardTitle>Language roulettes</CardTitle>
			<CardDescription>Get matched instantly with language partners around the world</CardDescription>
			<RoulettesCardHeaderFilters className="w-full" onHandleChange={onHandleFilterChange} />
		</CardHeader>
	);
};

export default RoulettesCardHeader;
