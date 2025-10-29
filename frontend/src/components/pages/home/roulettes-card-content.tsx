import type { FilterRouletteSchemaType } from "@/lib/types/roulette";

import RouletteCardList from "@/components/compound/roulette-card-list";
import { CardContent } from "@/components/ui/card";
import { ROOMS_LIMIT } from "@/lib/constants/room";
import { useGetRoulettes } from "@/queries/roulette";

interface RoulettesCardContentProps {
	rouletteFilters: FilterRouletteSchemaType;
}

const RoulettesCardContent = ({ rouletteFilters }: RoulettesCardContentProps) => {
	const { isPending: isPendingRoulettes, fetchNextPage: fetchNextRoulettesPage, data: fetchedRoulettes, hasNextPage: hasNextRoulettesPage, isFetchingNextPage: isFetchingNextRoulettesPage } = useGetRoulettes({ limit: ROOMS_LIMIT, language: rouletteFilters.language });
	const roulettes = fetchedRoulettes?.pages.flatMap(page => page?.roulettes || []) || [];

	const handleNewRoulettesPageUpload = () => {
		fetchNextRoulettesPage();
	};

	return (
		<CardContent className="overflow-auto">
			<RouletteCardList isFetchingNextPage={isFetchingNextRoulettesPage} hasNextPage={hasNextRoulettesPage} handleNewPageUpload={handleNewRoulettesPageUpload} isPending={isPendingRoulettes} roulettes={roulettes} ROULETTE_LIMIT={ROOMS_LIMIT} />
		</CardContent>
	);
};

export default RoulettesCardContent;
