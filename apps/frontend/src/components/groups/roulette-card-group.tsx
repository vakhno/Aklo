import type { RouletteDocLeanPopulatedType } from "@shared/mongo/types/roulette";

import { ItemGroup } from "@shared/design-system/item";

import RouletteCard from "@/components/items/roulette-card";

interface RouletteCardGroupProps {
	rouletteList: RouletteDocLeanPopulatedType[];
	handleSelectRoulette: (roulette: RouletteDocLeanPopulatedType) => void;
}

const RouletteCardGroup = ({ rouletteList, handleSelectRoulette }: RouletteCardGroupProps) => {
	return (
		<ItemGroup className="grid grid-cols-2 max-sm:grid-cols-1 gap-6">
			{rouletteList.map(roulette => (
				<RouletteCard roulette={roulette} key={String(roulette._id)} handleSelectRoulette={handleSelectRoulette} />
			))}
		</ItemGroup>
	);
};

export default RouletteCardGroup;
