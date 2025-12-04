import type { RouletteType } from "@/lib/types/roulette";

import RouletteCard from "@/components/items/roulette-card";
import { ItemGroup } from "@/components/ui/item";

interface RouletteCardGroupProps {
	rouletteList: RouletteType[];
	handleSelectRoulette: (roulette: RouletteType) => void;
}

const RouletteCardGroup = ({ rouletteList, handleSelectRoulette }: RouletteCardGroupProps) => {
	return (
		<ItemGroup className="flex flex-col gap-6">
			{rouletteList.map(roulette => (
				<RouletteCard roulette={roulette} key={roulette._id} handleSelectRoulette={handleSelectRoulette} />
			))}
		</ItemGroup>
	);
};

export default RouletteCardGroup;
