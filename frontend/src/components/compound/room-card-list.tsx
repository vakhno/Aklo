import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import type { RoomType } from "@/lib/types/room";

import RoomCard from "@/components/compound/room-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useJoinRoom } from "@/queries/room";

import JoinRoomModal from "./join-room-modal";

interface RoomCardListTypes {
	isPending: boolean;
	ROOMS_LIMIT: number;
	rooms?: RoomType[];
	hasNextPage: boolean;
	isFetchingNextPage: boolean;
	handleNewPageUpload: () => void;
	ownIds: string[];
}

const RoomCardList = ({ isPending, ROOMS_LIMIT, rooms, hasNextPage, isFetchingNextPage, handleNewPageUpload, ownIds }: RoomCardListTypes) => {
	const navigate = useNavigate();
	const [selectedRoom, setSelectedRoom] = useState<null | RoomType>(null);
	const [isJoinRoomModalOpen, setJoinRoomModalOpen] = useState(false);
	const { mutate: joinRoom } = useJoinRoom({
		onSuccess: () => {
			if (selectedRoom) {
				const { id } = selectedRoom;
				navigate({ to: "/room/$id", params: { id } });
			}
		},
		onError: () => {}
	});

	const handleSubmitAction = () => {
		if (selectedRoom) {
			joinRoom({ roomId: selectedRoom.id });
		}
	};

	const handleRoomSelect = (room: RoomType) => {
		setJoinRoomModalOpen(true);
		setSelectedRoom(room);
	};

	return (
		<>
			{isPending
				? (
						<div className="flex flex-col gap-6">
							{Array.from({ length: ROOMS_LIMIT }, (_, index) => (
								<Skeleton className="h-[162px] rounded-xl" key={index} />
							))}
						</div>

					)
				: (
						<>
							{!rooms || rooms.length === 0
								? (
										<div className="text-center py-12">
											<h3 className="text-2xl font-black text-black mb-2">NO ROOMS FOUND</h3>
											<p className="text-gray-700 text-lg">Try adjusting your filters or create a new room!</p>
										</div>
									)
								: (
										<div className="flex flex-col gap-6">
											{rooms.map(room => (
												<RoomCard room={room} isOwn={ownIds.includes(room.id)} key={room.id} handleRoomSelect={handleRoomSelect} />
											))}
											{hasNextPage
												? (
														<>
															{isFetchingNextPage
																? (
																		<div className="flex flex-col gap-6">
																			{Array.from({ length: ROOMS_LIMIT }, (_, index) => (
																				<Skeleton className="h-[162px] rounded-xl" key={`next-${index}`} />
																			))}
																		</div>
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
									)}
						</>
					)}

			{ selectedRoom
				&& <JoinRoomModal isCameraAvailable={selectedRoom.isCameraRequired} isMicAvailable={selectedRoom.isMicRequired} isOpen={isJoinRoomModalOpen} setOpen={setJoinRoomModalOpen} submitAction={handleSubmitAction} />}
		</>
	);
};

export default RoomCardList;
