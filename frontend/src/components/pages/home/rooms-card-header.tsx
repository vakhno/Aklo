import type { FilterRoomSchemaType } from "@/lib/types/room";

import RoomsCardHeaderFilters from "@/components/pages/home/rooms-card-header-filters";
import RoomsCardHeaderTitle from "@/components/pages/home/rooms-card-header-title";
import { CardHeader } from "@/components/ui/card";

interface RoomsCardHeaderProps {
	onHandleFilterChange: (data: FilterRoomSchemaType) => void;
	handleOpenCreateRoomModal: () => void;
}

const RoomsCardHeader = ({ onHandleFilterChange, handleOpenCreateRoomModal }: RoomsCardHeaderProps) => {
	return (
		<CardHeader className="flex flex-col w-full">
			<RoomsCardHeaderTitle handleOpenCreateRoomModal={handleOpenCreateRoomModal} />
			<RoomsCardHeaderFilters className="w-full" onHandleChange={onHandleFilterChange} />
		</CardHeader>
	);
};

export default RoomsCardHeader;
