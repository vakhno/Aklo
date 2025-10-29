import { useNavigate } from "@tanstack/react-router";
import { useEffect, useId, useState } from "react";

import type { JoinRoomSchemaType, RoomType } from "@/lib/types/room";

import DialogModal from "@/components/compound/dialog-modal";
import JoinRoomForm from "@/components/compound/join-room-form";
import RoomCard from "@/components/compound/room-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useMediaDevice } from "@/hooks/use-media-device";
import { useJoinRoom } from "@/queries/room";
import useMediaDeviceStore from "@/store/media-device-store";

interface RoomCardListTypes {
	isPending: boolean;
	ROOMS_LIMIT: number;
	rooms?: RoomType[];
	hasNextPage: boolean;
	isFetchingNextPage: boolean;
	handleNewPageUpload: () => void;
	ownIds?: string[];
}

const RoomCardList = ({ isPending, ROOMS_LIMIT, rooms, hasNextPage, isFetchingNextPage, handleNewPageUpload, ownIds }: RoomCardListTypes) => {
	const formId = useId();
	const navigate = useNavigate();
	const [selectedRoom, setSelectedRoom] = useState<null | RoomType>(null);
	const [isJoinRoomModalOpen, setJoinRoomModalOpen] = useState(false);
	const { addDevice, state: mediaDeviceStoreState } = useMediaDeviceStore();
	const { videoDevices, audioDevices, videoStream, audioStream, selectedVideoDevice, selectedAudioDevice, setupCombinedDevice, setupVideoDevice, setupAudioDevice } = useMediaDevice({ isAudioAvailable: selectedRoom?.isMicRequired, isVideoAvailable: selectedRoom?.isCameraRequired, videoDeviceId: mediaDeviceStoreState.video || "", audioDeviceId: mediaDeviceStoreState.audio || "" });

	const { mutate: joinRoom } = useJoinRoom({
		onSuccess: () => {
			if (selectedRoom) {
				const { id } = selectedRoom;
				navigate({ to: "/room/$id", params: { id } });
			}
		},
		onError: () => {}
	});

	const handleRoomSelect = (room: RoomType) => {
		setJoinRoomModalOpen(true);
		setSelectedRoom(room);
	};

	const onHandleSubmit = () => {
		if (selectedRoom) {
			const { id } = selectedRoom;
			joinRoom({ roomId: id });
		}
		setJoinRoomModalOpen(false);
	};

	const onHandleFormChange = async (data: JoinRoomSchemaType) => {
		const { videoDeviceId, audioDeviceId } = data;

		if (videoDeviceId !== selectedVideoDevice?.deviceId) {
			await setupVideoDevice(videoDeviceId);
			addDevice({ type: "video", value: videoDeviceId });
		}

		if (audioDeviceId !== selectedAudioDevice?.deviceId) {
			await setupAudioDevice(audioDeviceId);
			addDevice({ type: "audio", value: audioDeviceId });
		}
	};

	useEffect(() => {
		(async () => {
			await setupCombinedDevice();
		})();
	}, []);

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
												<RoomCard room={room} isOwn={ownIds && ownIds.includes(room.id)} key={room.id} handleRoomSelect={handleRoomSelect} />
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

			<DialogModal isOpen={isJoinRoomModalOpen} setOpen={setJoinRoomModalOpen} title="Join Room" description="Select your camera and microphone to join the room." submitTitle="Submit" cancelTitle="Cancel" isCancelVisible formId={formId}>
				<JoinRoomForm formId={formId} onHandleFormChange={onHandleFormChange} onHandleSubmit={onHandleSubmit} isCameraAvailable={selectedRoom?.isCameraRequired || false} isMicAvailable={selectedRoom?.isMicRequired || false} audioDevices={audioDevices} videoDevices={videoDevices} videoStream={videoStream} audioStream={audioStream} selectedVideoDevice={selectedVideoDevice} selectedAudioDevice={selectedAudioDevice} />
			</DialogModal>
		</>
	);
};

export default RoomCardList;
