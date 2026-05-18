import type { FilterRoomSchemaType } from "@shared/schemas/filter-room";

import { CardContent } from "@shared/design-system/card";
import { ScrollArea } from "@shared/design-system/scroll-area";
import { useGetIdListOfOwnRooms, useGetRooms, useGetSession } from "@shared/queries";
import { useNavigate } from "@tanstack/react-router";

import RoomCardList from "@/components/compound/room-card-list";
import { ROOMS_LIMIT } from "@/lib/constants/room";
import { cn } from "@/lib/utils/cn";

interface RoomsCardContentProps {
	className?: string;
	roomFilters: FilterRoomSchemaType;
	handleOpenCreateRoomModal: () => void;
}

const RoomsCardContent = ({ className, roomFilters, handleOpenCreateRoomModal }: RoomsCardContentProps) => {
	const navigate = useNavigate();
	const { data: session } = useGetSession();

	const apiBaseUrl = import.meta.env.VITE_API_URL;
	const { data: ownIds } = useGetIdListOfOwnRooms({ apiBaseUrl });
	const { isPending, fetchNextPage, data, hasNextPage, isFetchingNextPage } = useGetRooms({
		apiBaseUrl,
		limit: ROOMS_LIMIT,
		language: roomFilters.language
	});
	const roomList = data?.pages.flatMap(page => page?.rooms || []) || [];

	const handleNewRoomsPageUpload = () => {
		fetchNextPage();
	};

	const handleCreateRoomClick = () => {
		if (session) {
			handleOpenCreateRoomModal();
		}
		else {
			navigate({ to: "/auth/login" });
		}
	};

	return (
		<CardContent className={cn(className)}>
			<ScrollArea className="overflow-auto h-full">
				<RoomCardList
					isFetchingNextPage={isFetchingNextPage}
					isHasNextPage={hasNextPage}
					handleNewPageUpload={handleNewRoomsPageUpload}
					isPending={isPending}
					roomList={roomList}
					ROOMS_LIMIT={ROOMS_LIMIT}
					ownIds={ownIds}
					handleOpenCreateRoomModal={handleCreateRoomClick}
				/>
			</ScrollArea>
		</CardContent>
	);
};

export default RoomsCardContent;
