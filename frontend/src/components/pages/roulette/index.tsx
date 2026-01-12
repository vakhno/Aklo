import { useParams } from "@tanstack/react-router";

import Information from "@/components/pages/roulette/information";
import Participants from "@/components/pages/roulette/participants";

function RoulettePage() {
	const { id } = useParams({ from: "/_conversation/roulette/$id" });

	return (
		<div className="flex flex-col">
			<div className="h-dvh min-h-[420px]">
				<Participants rouletteId={id} />
			</div>
			<Information />
		</div>
	);
}

export default RoulettePage;
