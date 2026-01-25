import { createFileRoute } from "@tanstack/react-router";

import RoomPage from "@/components/pages/room";

export const Route = createFileRoute("/_blank/room/$id")({
	component: Room
});

function Room() {
	return (
		<RoomPage />
	);
}

export default Room;
