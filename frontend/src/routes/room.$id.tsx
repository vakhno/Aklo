import { createFileRoute } from "@tanstack/react-router";

import RoomCard from "@/components/pages/room/room-card";

export const Route = createFileRoute("/room/$id")({
	component: Room
});

function Room() {
	return (
		<RoomCard />
	);
}
export default Room;
