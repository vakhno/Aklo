import type { FilterRouletteSchemaType } from "@/lib/types/roulette";

import RouletteFiltersForm from "@/components/forms/roulette-filters-form";
import { useGetRoulettesLanguages } from "@/queries/roulette";

interface RouletteFiltersTypes {
	className?: string;
	onHandleChange?: (data: FilterRouletteSchemaType) => void;
}

const RoulettesCardHeaderFilters = ({ className, onHandleChange }: RouletteFiltersTypes) => {
	const { data, isLoading, isError, isSuccess } = useGetRoulettesLanguages();
	const languageList = isSuccess ? data : [];
	const isDisabled = isLoading || isError;

	return (
		<RouletteFiltersForm className={className} languageList={languageList} isDisabled={isDisabled} onHandleChange={onHandleChange} />
	);
};

export default RoulettesCardHeaderFilters;
