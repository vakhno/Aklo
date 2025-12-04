import { createFileRoute } from "@tanstack/react-router";

import RouletteCard from "@/components/pages/roulette/roulette-card";

export const Route = createFileRoute("/roulette/$id")({
	component: Roulette
});

function Roulette() {
	return (
		<RouletteCard />
	);
}

export default Roulette;
