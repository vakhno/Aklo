import { useState } from "react";

import type { FilterRouletteSchemaType } from "@/lib/types/roulette";

import { Card } from "@/components/ui/card";
import { useGetRoulettes } from "@/queries/roulette";

import RoulettesCardContent from "./roulettes-card-content";
import RoulettesCardHeader from "./roulettes-card-header";

const RoulettesCard = () => {
	const [rouletteFilters, setRouletteFilters] = useState<FilterRouletteSchemaType>({
		language: ""
	});

	const { data } = useGetRoulettes({ language: rouletteFilters.language, limit: 20 });

	const roulettes = data?.pages.flatMap(page => page.roulettes) ?? [];
	const totalActiveUsers = roulettes.reduce((sum, room) => sum + (room.activeUsersCount || 0), 0);

	const onHandleFilterChange = (data: FilterRouletteSchemaType) => {
		setRouletteFilters(data);
	};

	return (
		<section id="roulettes" className="scroll-mt-[calc(var(--header-height)+var(--header-margin-bottom))]">
			<Card>
				<RoulettesCardHeader
					onHandleFilterChange={onHandleFilterChange}
					totalActiveUsers={totalActiveUsers}
				/>
				<RoulettesCardContent className="h-[50vh]" rouletteFilters={rouletteFilters} />
			</Card>
		</section>
	);
};

export default RoulettesCard;
