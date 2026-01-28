import { useMemo, useState } from "react";

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

	const roulettes = useMemo(() => {
		return data?.pages.flatMap(page => page.roulettes) ?? [];
	}, [data]);

	const totalActiveUsers = useMemo(() => {
		return roulettes.reduce((sum, r) => sum + (r.activeUsersCount || 0), 0);
	}, [roulettes]);

	const onHandleFilterChange = (data: FilterRouletteSchemaType) => {
		setRouletteFilters(data);
	};

	return (
		<section id="roulettes">
			<Card className="h-[80vh]">
				<RoulettesCardHeader
					onHandleFilterChange={onHandleFilterChange}
					totalActiveUsers={totalActiveUsers}
				/>
				<RoulettesCardContent className="h-full" rouletteFilters={rouletteFilters} />
			</Card>
		</section>
	);
};

export default RoulettesCard;
