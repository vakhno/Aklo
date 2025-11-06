import type { FilterRouletteSchemaType } from "@/lib/types/roulette";

import RouletteCardList from "@/components/compound/roulette-card-list";
import { CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ROOMS_LIMIT } from "@/lib/constants/room";
import { cn } from "@/lib/utils/cn";
import { useGetRoulettes } from "@/queries/roulette";

interface RoulettesCardContentProps {
	className?: string;
	rouletteFilters: FilterRouletteSchemaType;
}

const RoulettesCardContent = ({ className, rouletteFilters }: RoulettesCardContentProps) => {
	const { isPending: isPendingRoulettes, fetchNextPage: fetchNextRoulettesPage, data: fetchedRoulettes, hasNextPage: hasNextRoulettesPage, isFetchingNextPage: isFetchingNextRoulettesPage } = useGetRoulettes({ limit: ROOMS_LIMIT, language: rouletteFilters.language });
	const roulettes = fetchedRoulettes?.pages.flatMap(page => page?.roulettes || []) || [];

	const handleNewRoulettesPageUpload = () => {
		fetchNextRoulettesPage();
	};

	return (
		<CardContent className={cn(className)}>
			<ScrollArea className="overflow-auto h-full">
				<RouletteCardList isFetchingNextPage={isFetchingNextRoulettesPage} hasNextPage={hasNextRoulettesPage} handleNewPageUpload={handleNewRoulettesPageUpload} isPending={isPendingRoulettes} roulettes={roulettes} ROULETTE_LIMIT={ROOMS_LIMIT} />
			</ScrollArea>
		</CardContent>
	);
};

export default RoulettesCardContent;
