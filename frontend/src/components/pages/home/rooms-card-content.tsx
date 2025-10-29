import type { FilterRoomSchemaType } from "@/lib/types/room";

import RoomCardList from "@/components/compound/room-card-list";
import { CardContent } from "@/components/ui/card";
import { ROOMS_LIMIT } from "@/lib/constants/room";
import { useGetIdListOfOwnRooms, useGetRooms } from "@/queries/room";

interface RoomsCardContentProps {
	roomFilters: FilterRoomSchemaType;
}

const RoomsCardContent = ({ roomFilters }: RoomsCardContentProps) => {
	const { data: ownIds } = useGetIdListOfOwnRooms({});
	const { isPending: isPendingRooms, fetchNextPage: fetchNextRoomsPage, data: fetchedRooms, hasNextPage: hasNextRoomsPage, isFetchingNextPage: isFetchingNextRoomsPage } = useGetRooms({ limit: ROOMS_LIMIT, language: roomFilters.language, category: roomFilters.category });
	const rooms = fetchedRooms?.pages.flatMap(page => page?.rooms || []) || [];

	const handleNewRoomsPageUpload = () => {
		fetchNextRoomsPage();
	};

	return (
		<CardContent className="overflow-auto">
			<RoomCardList isFetchingNextPage={isFetchingNextRoomsPage} hasNextPage={hasNextRoomsPage} handleNewPageUpload={handleNewRoomsPageUpload} isPending={isPendingRooms} rooms={rooms} ROOMS_LIMIT={ROOMS_LIMIT} ownIds={ownIds} />
		</CardContent>
	);
};

export default RoomsCardContent;
