import type { RoomDocLeanPopulatedType } from "@shared/mongo/types/room";

import { Button } from "@shared/design-system/button";
import { useNavigate } from "@tanstack/react-router";

import EmptyBlock from "@/components/compound/empty-block";

import RoomCardGroup from "../groups/room-card-group";
import RoomCardGroupSkeleton from "../skeletons/room-card-group-skeleton";

interface RoomCardListTypes {
	isPending: boolean;
	ROOMS_LIMIT: number;
	roomList?: RoomDocLeanPopulatedType[];
	isHasNextPage: boolean;
	isFetchingNextPage: boolean;
	handleNewPageUpload: () => void;
	handleOpenCreateRoomModal: () => void;
	ownIds?: string[];
}

const RoomCardList = ({ isPending, ROOMS_LIMIT, roomList, isHasNextPage, isFetchingNextPage, handleNewPageUpload, handleOpenCreateRoomModal, ownIds }: RoomCardListTypes) => {
	const navigate = useNavigate();

	const handleSelectRoom = (room: RoomDocLeanPopulatedType) => {
		const { _id } = room;

		navigate({ to: "/room/$id", params: { id: String(_id) } });
	};

	const onHandleEmptyBlockClick = () => {
		handleOpenCreateRoomModal();
	};

	return (
		<>
			{isPending
				? (
						<RoomCardGroupSkeleton limit={ROOMS_LIMIT} />
					)
				: (
						<>
							{roomList && roomList.length !== 0
								? (

										<div className="flex flex-col gap-6">
											<RoomCardGroup roomList={roomList} ownIds={ownIds} handleSelectRoom={handleSelectRoom} />
											{isHasNextPage
												? (
														<>
															{isFetchingNextPage
																? (
																		<RoomCardGroupSkeleton limit={ROOMS_LIMIT} />
																	)
																: (
																		<Button className="m-auto" onClick={handleNewPageUpload}>
																			Load more
																		</Button>
																	)}
														</>
													)
												: null}
										</div>

									)
								: (
										<div className="flex items-center justify-center h-full">
											<EmptyBlock title="NO AVAILABLE ROOMS" description="Create a room and be the first one!" buttonTitle="Create room" buttonHandleClick={onHandleEmptyBlockClick} />
										</div>
									)}
						</>
					)}
		</>
	);
};

export default RoomCardList;
