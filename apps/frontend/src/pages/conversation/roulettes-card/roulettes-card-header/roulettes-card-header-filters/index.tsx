import type { FilterRouletteSchemaType } from "@shared/schemas/filter-roulette";

import { useGetRoulettesLanguages } from "@shared/queries";

import RouletteFiltersForm from "@/components/forms/roulette-filters-form";

interface RouletteFiltersTypes {
	className?: string;
	onHandleChange?: (data: FilterRouletteSchemaType) => void;
}

const RoulettesCardHeaderFilters = ({ className, onHandleChange }: RouletteFiltersTypes) => {
	const { data, isLoading, isError, isSuccess } = useGetRoulettesLanguages({
		apiBaseUrl: import.meta.env.VITE_API_URL
	});
	const languageList = isSuccess ? data : [];
	const isDisabled = isLoading || isError;

	return (
		<RouletteFiltersForm className={className} languageList={languageList} isDisabled={isDisabled} onHandleChange={onHandleChange} />
	);
};

export default RoulettesCardHeaderFilters;
