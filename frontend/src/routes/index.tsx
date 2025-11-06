import { createFileRoute } from "@tanstack/react-router";

import RoomsCard from "@/components/pages/home/rooms-card";
import RoulettesCard from "@/components/pages/home/roulettes-card";

export const Route = createFileRoute("/")({
	component: Home
});

function Home() {
	return (
		<div className="flex flex-col gap-4">
			<RoulettesCard />
			<RoomsCard />
		</div>
	);
}
