import { useState } from "react";

import type { FilterRouletteSchemaType } from "@/lib/types/roulette";

import { Card } from "@/components/ui/card";

import RoulettesCardContent from "./roulettes-card-content";
import RoulettesCardHeader from "./roulettes-card-header";

const RoulettesCard = () => {
	const [rouletteFilters, setRouletteFilters] = useState<FilterRouletteSchemaType>({
		language: ""
	});

	const onHandleFilterChange = (data: FilterRouletteSchemaType) => {
		setRouletteFilters(data);
	};

	return (
		<Card className="h-[60vh]">
			<RoulettesCardHeader onHandleFilterChange={onHandleFilterChange} />
			<RoulettesCardContent className="h-full" rouletteFilters={rouletteFilters} />
		</Card>
	);
};

export default RoulettesCard;
