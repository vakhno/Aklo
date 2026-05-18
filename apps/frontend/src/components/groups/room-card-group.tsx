import type { RoomDocLeanPopulatedType } from "@shared/mongo/types/room";

import { ItemGroup } from "@shared/design-system/item";

import RoomCard from "@/components/items/room-card";

interface RoomCardGroupProps {
	roomList: RoomDocLeanPopulatedType[];
	ownIds?: string[];
	handleSelectRoom: (room: RoomDocLeanPopulatedType) => void;
}

const RoomCardGroup = ({ roomList, ownIds, handleSelectRoom }: RoomCardGroupProps) => {
	return (
		<ItemGroup className="flex flex-col gap-6">
			{roomList.map(room => (
				<RoomCard room={room} isOwn={ownIds && ownIds.includes(room.creatorId)} key={String(room._id)} handleSelectRoom={handleSelectRoom} />
			))}
		</ItemGroup>
	);
};

export default RoomCardGroup;
