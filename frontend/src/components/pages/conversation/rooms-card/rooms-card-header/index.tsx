import { MessageSquare, Users } from "lucide-react";

import type { FilterRoomSchemaType } from "@/lib/types/room";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader } from "@/components/ui/card";

import RoomsCardHeaderFilters from "./room-card-header-filters";

interface RoomsCardHeaderProps {
	onHandleFilterChange: (data: FilterRoomSchemaType) => void;
	handleOpenCreateRoomModal: () => void;
	totalRooms?: number;
	totalActiveUsers?: number;
}

const RoomsCardHeader = ({
	onHandleFilterChange,
	handleOpenCreateRoomModal,
	totalRooms,
	totalActiveUsers
}: RoomsCardHeaderProps) => {
	return (
		<CardHeader className="flex flex-col w-full">
			<div className="w-full flex justify-between items-center gap-2">
				<div className="flex flex-col gap-2">
					<h2 className="leading-none font-semibold">
						Topic Rooms
					</h2>

					<CardDescription>
						Join topic-based video rooms to practice your language skills while discussing
						subjects you enjoy. From movies and music to tech and travel - find a room
						that matches your interests.
					</CardDescription>
					<div className="flex gap-2">
						<Badge variant="secondary" className="gap-1" aria-label={`${totalActiveUsers} users currently online`}>
							<Users className="h-3 w-3" aria-hidden="true" />
							<span>{totalActiveUsers}</span>
							{" "}
							<span>online</span>
						</Badge>
						<Badge variant="secondary" className="gap-1" aria-label={`${totalRooms} rooms available`}>
							<MessageSquare className="h-3 w-3" aria-hidden="true" />
							<span>{totalRooms}</span>
							{" "}
							<span>rooms</span>
						</Badge>

					</div>

				</div>
				<Button onClick={handleOpenCreateRoomModal} aria-label="Create a new topic room">
					Create
				</Button>
			</div>
			<RoomsCardHeaderFilters className="w-full" onHandleChange={onHandleFilterChange} />
		</CardHeader>
	);
};

export default RoomsCardHeader;
