import { MessageSquare } from "lucide-react";

import type { FilterRoomSchemaType } from "@/lib/types/room";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader } from "@/components/ui/card";
import { useGetSession } from "@/queries/auth";
import { useAuthStore } from "@/store/auth-store";

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
	const { data: session } = useGetSession();
	const { openLoginModal } = useAuthStore();

	const handleCreateClick = () => {
		if (session) {
			handleOpenCreateRoomModal();
		}
		else {
			openLoginModal();
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
