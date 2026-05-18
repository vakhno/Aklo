import type { FilterRouletteSchemaType } from "@shared/schemas/filter-roulette";

import { CardContent } from "@shared/design-system/card";
import { ScrollArea } from "@shared/design-system/scroll-area";
import { useGetRoulettes } from "@shared/queries";

import RouletteCardList from "@/components/compound/roulette-card-list";
import { ROOMS_LIMIT } from "@/lib/constants/room";
import { cn } from "@/lib/utils/cn";

interface RoulettesCardContentProps {
	className?: string;
	rouletteFilters: FilterRouletteSchemaType;
}

const RoulettesCardContent = ({ className, rouletteFilters }: RoulettesCardContentProps) => {
	const apiBaseUrl = import.meta.env.VITE_API_URL;
	const { isPending, fetchNextPage, data, hasNextPage, isFetchingNextPage } = useGetRoulettes({
		apiBaseUrl,
		limit: ROOMS_LIMIT,
		language: rouletteFilters.language
	});
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
