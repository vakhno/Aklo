import type { FilterRoomSchemaType } from "@/lib/types/room";

import { LoginDialog } from "@/components/compound/login-dialog";
import RoomCardList from "@/components/compound/room-card-list";
import { CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ROOMS_LIMIT } from "@/lib/constants/room";
import { cn } from "@/lib/utils/cn";
import { useGetIdListOfOwnRooms, useGetRooms } from "@/queries/room";
import { useAuthStore } from "@/store/auth-store";

interface RoomsCardContentProps {
	className?: string;
	roomFilters: FilterRoomSchemaType;
	handleOpenCreateRoomModal: () => void;
}

const RoomsCardContent = ({ className, roomFilters, handleOpenCreateRoomModal }: RoomsCardContentProps) => {
	const { session, showLoginModal, openLoginModal, closeLoginModal } = useAuthStore();

	const { data: ownIds } = useGetIdListOfOwnRooms({});
	const { isPending, fetchNextPage, data, hasNextPage, isFetchingNextPage } = useGetRooms({ limit: ROOMS_LIMIT, language: roomFilters.language });
	const roomList = data?.pages.flatMap(page => page?.rooms || []) || [];

	const handleNewRoomsPageUpload = () => {
		fetchNextPage();
	};

	const handleCreateRoomClick = () => {
		if (session) {
			handleOpenCreateRoomModal();
		}
		else {
			openLoginModal();
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
			<LoginDialog open={showLoginModal} onOpenChange={closeLoginModal} />
		</CardContent>
	);
};

export default RoomsCardContent;
