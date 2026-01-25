import { createFileRoute } from "@tanstack/react-router";

import RoulettePage from "@/components/pages/roulette";

export const Route = createFileRoute("/_blank/roulette/$id")({
	component: Roulette
});

function Roulette() {
	return (
		<RoulettePage />
	);
}

export default Roulette;
