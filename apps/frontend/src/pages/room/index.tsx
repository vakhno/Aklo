import { useParams } from "@tanstack/react-router";

import Information from "@/pages/room/information";
import Participants from "@/pages/room/participants";

function RoomPage() {
	const { id } = useParams({ from: "/_blank/room/$id" });

	return (
		<div className="flex flex-col">
			<div className="h-dvh min-h-[420px]">
				<Participants roomId={id} />
			</div>
			<Information />
		</div>
	);
}

export default RoomPage;
