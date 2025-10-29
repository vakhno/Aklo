import type { FilterRouletteSchemaType } from "@/lib/types/roulette";

import RouletteFilters from "@/components/compound/roulette-filters";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { useExistLanguages } from "@/queries/list";

interface RoulettesCardHeaderProps {
	onHandleFilterChange: (data: FilterRouletteSchemaType) => void;
}

const RoulettesCardHeader = ({ onHandleFilterChange }: RoulettesCardHeaderProps) => {
	const { data: existLanguages, isLoading: isExistLanguagesLoading } = useExistLanguages();

	const onHandleRouletteFiltersChange = (data: FilterRouletteSchemaType) => {
		onHandleFilterChange(data);
	};
	return (
		<CardHeader className="flex flex-col">
			<CardTitle>CHAT ROULETTES</CardTitle>
			<RouletteFilters className="w-full" languagesList={existLanguages} isLanguagesDisabled={isExistLanguagesLoading} onHandleChange={onHandleRouletteFiltersChange} />
		</CardHeader>
	);
};

export default RoulettesCardHeader;
