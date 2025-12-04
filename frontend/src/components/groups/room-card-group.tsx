import type { RoomType } from "@/lib/types/room";

import RoomCard from "@/components/items/room-card";
import { ItemGroup } from "@/components/ui/item";

interface RoomCardGroupProps {
	roomList: RoomType[];
	ownIds?: string[];
	handleSelectRoom: (room: RoomType) => void;
}

const RoomCardGroup = ({ roomList, ownIds, handleSelectRoom }: RoomCardGroupProps) => {
	return (
		<ItemGroup className="flex flex-col gap-6">
			{roomList.map(room => (
				<RoomCard room={room} isOwn={ownIds && ownIds.includes(room.creatorId)} key={room._id} handleSelectRoom={handleSelectRoom} />
			))}
		</ItemGroup>
	);
};

export default RoomCardGroup;
