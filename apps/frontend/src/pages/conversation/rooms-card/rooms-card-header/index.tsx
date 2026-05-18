import type { FilterRoomSchemaType } from "@shared/schemas/filter-room";

import { Badge } from "@shared/design-system/badge";
import { Button } from "@shared/design-system/button";
import { CardDescription, CardHeader } from "@shared/design-system/card";
import { useGetSession } from "@shared/queries";
import { useNavigate } from "@tanstack/react-router";
import { MessageSquare } from "lucide-react";

import RoomsCardHeaderFilters from "./room-card-header-filters";

interface RoomsCardHeaderProps {
	onHandleFilterChange: (data: FilterRoomSchemaType) => void;
	handleOpenCreateRoomModal: () => void;
	totalRooms?: number;
}

const RoomsCardHeader = ({
	onHandleFilterChange,
	handleOpenCreateRoomModal,
	totalRooms
}: RoomsCardHeaderProps) => {
	const navigate = useNavigate();
	const { data: session } = useGetSession();

	const handleCreateClick = () => {
		if (session) {
			handleOpenCreateRoomModal();
		}
		else {
			navigate({ to: "/auth/login" });
		}
	};

	return (
		<CardHeader className="flex flex-col w-full">
			<div className="w-full flex justify-between items-center gap-2">
				<div className="flex flex-col gap-2">
					<div className="flex gap-2">
						<Badge variant="secondary" className="gap-2" aria-label={`${totalRooms} rooms available`}>
							<MessageSquare size={4} aria-hidden="true" />
							<span>Rooms</span>
							{" "}
							<strong>{totalRooms}</strong>
						</Badge>
					</div>
					<h2 className="leading-none font-semibold">
						Topic Rooms
					</h2>
					<CardDescription>
						Join topic-based video rooms to practice your language skills while discussing
						subjects you enjoy. From movies and music to tech and travel - find a room
						that matches your interests.
					</CardDescription>
				</div>
				<Button variant="secondary" onClick={handleCreateClick} aria-label="Create a new topic room">
					Create
				</Button>
			</div>
			<RoomsCardHeaderFilters className="w-full" onHandleChange={onHandleFilterChange} />
		</CardHeader>
	);
};

export default RoomsCardHeader;
