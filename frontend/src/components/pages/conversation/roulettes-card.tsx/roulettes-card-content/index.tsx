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
	const { isPending, fetchNextPage, data, hasNextPage, isFetchingNextPage } = useGetRoulettes({ limit: ROOMS_LIMIT, language: rouletteFilters.language });
	const rouletteList = data?.pages.flatMap(page => page?.roulettes || []) || [];

	const handleNewRoulettesPageUpload = () => {
		fetchNextPage();
	};

	return (
		<CardContent className={cn(className)}>
			<ScrollArea className="overflow-auto h-full">
				<RouletteCardList isFetchingNextPage={isFetchingNextPage} isHasNextPage={hasNextPage} handleNewPageUpload={handleNewRoulettesPageUpload} isPending={isPending} rouletteList={rouletteList} ROULETTE_LIMIT={ROOMS_LIMIT} />
			</ScrollArea>
		</CardContent>
	);
};

export default RoulettesCardContent;
