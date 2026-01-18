import type { FilterRoomSchemaType } from "@/lib/types/room";

import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import RoomsCardHeaderFilters from "./room-card-header-filters";

interface RoomsCardHeaderProps {
	onHandleFilterChange: (data: FilterRoomSchemaType) => void;
	handleOpenCreateRoomModal: () => void;
}

const RoomsCardHeader = ({ onHandleFilterChange, handleOpenCreateRoomModal }: RoomsCardHeaderProps) => {
	const handleOpenCreateRoomModalClick = () => {
		handleOpenCreateRoomModal();
	};

	return (
		<CardHeader className="flex flex-col w-full">
			<div className="w-full flex justify-between items-center">
				<div className="flex flex-col gap-2">
					<CardTitle>Thematic rooms</CardTitle>
					<CardDescription>Join conversations on topics you love or create your own</CardDescription>
				</div>
				<Button onClick={handleOpenCreateRoomModalClick}>Create</Button>
			</div>
			<RoomsCardHeaderFilters className="w-full" onHandleChange={onHandleFilterChange} />
		</CardHeader>
	);
};

export default RoomsCardHeader;
