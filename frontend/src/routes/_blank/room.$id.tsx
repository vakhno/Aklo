import { createFileRoute } from "@tanstack/react-router";

import RoomPage from "@/components/pages/room";

export const Route = createFileRoute("/_blank/room/$id")({
	component: Room,
	head: () => ({
		meta: [{ title: "Aklo - Room" }]
	})
});

function Room() {
	return (
		<RoomPage />
	);
}

export default Room;
