import type { FilterRouletteSchemaType } from "@shared/schemas/filter-roulette";

import { Card } from "@shared/design-system/card";
import { useGetRoulettes } from "@shared/queries";
import { useState } from "react";

import RoulettesCardContent from "./roulettes-card-content";
import RoulettesCardHeader from "./roulettes-card-header";

const RoulettesCard = () => {
	const [rouletteFilters, setRouletteFilters] = useState<FilterRouletteSchemaType>({
		language: ""
	});

	const { data } = useGetRoulettes({
		apiBaseUrl: import.meta.env.VITE_API_URL,
		language: rouletteFilters.language,
		limit: 20
	});

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
