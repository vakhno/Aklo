import type { FilterRoomSchemaType } from "@/lib/types/room";

import RoomCardList from "@/components/compound/room-card-list";
import { CardContent } from "@/components/ui/card";
import { ROOMS_LIMIT } from "@/lib/constants/room";
import { cn } from "@/lib/utils/cn";
import { useGetIdListOfOwnRooms, useGetRooms } from "@/queries/room";

interface RoomsCardContentProps {
	className?: string;
	roomFilters: FilterRoomSchemaType;
	handleOpenCreateRoomModal: () => void;
}

const RoomsCardContent = ({ className, roomFilters, handleOpenCreateRoomModal }: RoomsCardContentProps) => {
	const { data: ownIds } = useGetIdListOfOwnRooms({});
	const { isPending: isPendingRooms, fetchNextPage: fetchNextRoomsPage, data: fetchedRooms, hasNextPage: hasNextRoomsPage, isFetchingNextPage: isFetchingNextRoomsPage } = useGetRooms({ limit: ROOMS_LIMIT, language: roomFilters.language, category: roomFilters.category });
	const rooms = fetchedRooms?.pages.flatMap(page => page?.rooms || []) || [];

	const handleNewRoomsPageUpload = () => {
		fetchNextRoomsPage();
	};

	return (
		<CardContent className={cn(className)}>
			<RoomCardList isFetchingNextPage={isFetchingNextRoomsPage} hasNextPage={hasNextRoomsPage} handleNewPageUpload={handleNewRoomsPageUpload} isPending={isPendingRooms} rooms={rooms} ROOMS_LIMIT={ROOMS_LIMIT} ownIds={ownIds} handleOpenCreateRoomModal={handleOpenCreateRoomModal} />
		</CardContent>
	);
};

export default RoomsCardContent;
