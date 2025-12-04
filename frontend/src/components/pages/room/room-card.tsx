import { useNavigate, useParams } from "@tanstack/react-router";
import { Loader } from "lucide-react";
import { useEffect, useId, useState } from "react";

import type { JoinRoomSchemaType, RoomType } from "@/lib/types/room";

import AlertDialogModal from "@/components/compound/alert-dialog-modal";
import DialogModal from "@/components/compound/dialog-modal";
import GuestVideoContainer from "@/components/compound/guest-video-container";
import OwnerVideoContainer from "@/components/compound/room-own-video-container";
import RuleWarningMessage from "@/components/compound/rule-warning-message";
import JoinRoomForm from "@/components/forms/join-room-form";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMediaDevice } from "@/hooks/use-media-device";
import { useWebRTC } from "@/hooks/use-webrtc";
import { useCheckIsCreator, useDeleteRoom, useGetRoom } from "@/queries/room";
import useMediaDeviceStore from "@/store/media-device-store";

function RoomCard() {
	const navigate = useNavigate();
	const formId = useId();
	const [isJoinRoomModalOpen, setJoinRoomModalOpen] = useState(true);
	const { addDevice, state: mediaDeviceStoreState } = useMediaDeviceStore();

	const { id } = useParams({ from: "/room/$id" });
	const { data: isCreator, isPending: isPendingCheckIsCreator, isError: isErrorCheckIsCreator } = useCheckIsCreator({ id });
	const { data: room, isPending: isPendingGetRoom, isError: isErrorGetRoom } = useGetRoom({ id });

	const { mutate: deleteRoom } = useDeleteRoom({
		options: {
			onSuccess: () => {
				navigate({ to: "/" });
			},
			onError: () => {}
		}
	});

	const { combinedStream, videoDevices, audioDevices, videoStream, audioStream, selectedVideoDevice, selectedAudioDevice, setupCombinedDevice, setupVideoDevice, setupAudioDevice } = useMediaDevice({ isAudioAvailable: room?.isMicRequired, isVideoAvailable: room?.isCameraRequired, videoDeviceId: mediaDeviceStoreState.video || "", audioDeviceId: mediaDeviceStoreState.audio || "" });

	const { remoteStream, isExpired, isKicked, isHasGuest, handleKickAll, initSocket } = useWebRTC({ roomId: id, localStream: combinedStream });
	const [isExpiredModalOpened, setExpiredModalOpened] = useState(false);
	const [isKickedModalOpened, setKickedModalOpened] = useState(false);
	const [isAvailable, setAvailable] = useState(false);

	useEffect(() => {
		setExpiredModalOpened(isExpired);
		setKickedModalOpened(isKicked);
		setAvailable(false);
	}, [isExpired, isKicked]);

	useEffect(() => {
		initSocket();
	}, [combinedStream]);

	const handleRoomExpiredAdoption = () => {
		navigate({ to: "/" });
	};

	const handleRoomKickedAdoption = () => {
		navigate({ to: "/" });
	};

	const handleKickClick = () => {
		handleKickAll();
	};

	const handleDelete = async (room: RoomType) => {
		const { _id } = room;

		await deleteRoom({ id: _id });
	};

	if (isErrorGetRoom || isErrorCheckIsCreator) {
		return (
			<div className="flex items-center justify-center h-full w-full text-red-500"></div>
		);
	}

	if (isPendingCheckIsCreator || isPendingGetRoom || !room) {
		return (
			<div className="w-full h-full flex items-center justify-center">
				<Loader className="w-6 h-6 text-white animate-spin" />
			</div>
		);
	}

	const handleSettingsSubmit = async (data: JoinRoomSchemaType) => {
		const { audioDeviceId, videoDeviceId } = data;

		if (selectedAudioDevice?.deviceId !== audioDeviceId || selectedVideoDevice?.deviceId !== videoDeviceId) {
			await setupCombinedDevice();
		}
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

	const onHandleSubmit = async () => {
		await setupCombinedDevice();

		setJoinRoomModalOpen(false);
		setAvailable(true);
	};

	const onHandleCancel = () => {
		navigate({ to: "/" });
	};

	return (
		<>
			{!isExpired && !isKicked && isAvailable
				? (
						<>
							<Card className="h-[calc(100vh-var(--header-height)-var(--header-margin-bottom))]">
								<CardContent className="w-full h-full">
									<div className="w-full h-full flex flex-col gap-2">
										<div className="overflow-hidden flex-1 w-full h-full">
											<div className="flex max-sm:flex-col gap-2 w-full h-full justify-center">
												{room && (
													<>
														{isCreator
															? <OwnerVideoContainer room={room} stream={combinedStream} isCreator handleSettingsSubmit={handleSettingsSubmit} handleDelete={handleDelete} className="flex-1 w-full h-full overflow-hidden" />
															: <GuestVideoContainer room={room} stream={combinedStream} className="flex-1 w-full h-full overflow-hidden" />}

														{isHasGuest
															? <GuestVideoContainer room={room} stream={remoteStream} isKickUserAvailable={isCreator} isVolumeSliderAvailable handleKickClick={handleKickClick} className="flex-1 w-full h-full overflow-hidden" />
															: null	}
													</>
												)}
											</div>
										</div>
										<div className="flex-0">
											<RuleWarningMessage />
										</div>
									</div>
								</CardContent>
							</Card>
						</>
					)
				: null}
			<DialogModal isOpen={isJoinRoomModalOpen} setOpen={setJoinRoomModalOpen} onCancel={onHandleCancel} title="Join Room" description="Select your camera and microphone to join the room." submitTitle="Submit" cancelTitle="Cancel" isCancelVisible formId={formId}>
				<ScrollArea className="h-full">
					<JoinRoomForm formId={formId} onHandleFormChange={onHandleFormChange} onHandleSubmit={onHandleSubmit} isCameraAvailable={room?.isCameraRequired || false} isMicAvailable={room?.isMicRequired || false} audioDevices={audioDevices} videoDevices={videoDevices} videoStream={videoStream} audioStream={audioStream} selectedVideoDevice={selectedVideoDevice} selectedAudioDevice={selectedAudioDevice} />
				</ScrollArea>
			</DialogModal>
			<AlertDialogModal
				isOpen={isExpiredModalOpened}
				setOpen={setExpiredModalOpened}
				title="Room is unavailable"
				submitTitle="Ok"
				onSubmit={handleRoomExpiredAdoption}
			/>
			<AlertDialogModal
				isOpen={isKickedModalOpened}
				setOpen={setKickedModalOpened}
				title="You was kicked"
				submitTitle="Ok"
				onSubmit={handleRoomKickedAdoption}
			/>
		</>
	);
}
export default RoomCard;
