import type { FilterRoomSchemaType } from "@/lib/types/room";

import RoomCardList from "@/components/compound/room-card-list";
import { CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
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
	const { isPending, fetchNextPage, data, hasNextPage, isFetchingNextPage } = useGetRooms({ limit: ROOMS_LIMIT, language: roomFilters.language });
	const roomList = data?.pages.flatMap(page => page?.rooms || []) || [];

	const handleNewRoomsPageUpload = () => {
		fetchNextPage();
	};

	return (
		<CardContent className={cn(className)}>
			<ScrollArea className="overflow-auto h-full">
				<RoomCardList isFetchingNextPage={isFetchingNextPage} isHasNextPage={hasNextPage} handleNewPageUpload={handleNewRoomsPageUpload} isPending={isPending} roomList={roomList} ROOMS_LIMIT={ROOMS_LIMIT} ownIds={ownIds} handleOpenCreateRoomModal={handleOpenCreateRoomModal} />
			</ScrollArea>
		</CardContent>
	);
};

export default RoomsCardContent;
