import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

import type { RoomType, SettingsRoomSchemaType } from "@/lib/types/room";

import { Card, CardContent } from "@/components/ui/card";
import { useMediaDevice } from "@/hooks/use-media-device";
import { useWebRTC } from "@/hooks/use-webrtc";
import { cn } from "@/lib/utils/cn";
import { useDeleteRoom } from "@/queries/room";
import useMediaDeviceStore from "@/store/media-device-store";

import AcceptDeleteAlertDialog from "./accept-delete-alert-dialog";
import AcceptKickAlertDialog from "./accept-kick-alert-dialog";
import AcceptUnavailableAlertDialog from "./accept-unavailable-alert-dialog";
import LocaleStream from "./locale-stream";
import RemoteStream from "./remote-stream";
import Tools from "./tools";

interface StreamsProps {
	room: RoomType;
	isCreator?: boolean;
	isAvailableToVisit?: boolean;
	isErrorCheckIsCreator: boolean;
	isErrorIsAvailableToVisit: boolean;
}

const Streams = ({ room, isCreator, isAvailableToVisit, isErrorCheckIsCreator, isErrorIsAvailableToVisit }: StreamsProps) => {
	const navigate = useNavigate();

	const { state: mediaDeviceStoreState } = useMediaDeviceStore();
	const { mutate: deleteRoom } = useDeleteRoom({});
	const { combinedStream, selectedAudioDevice, selectedVideoDevice, setupCombinedDevice, cleanCombinedStream, toggleCameraMute, toggleMicMute } = useMediaDevice({ isAudioAvailable: room?.isMicRequired, isVideoAvailable: room?.isCameraRequired, videoDeviceId: mediaDeviceStoreState.video || "", audioDeviceId: mediaDeviceStoreState.audio || "" });
	const { remotePeers, isKicked, isFailed, isDeleted, handleKick, initSocket } = useWebRTC({ roomId: room._id, localStream: combinedStream });

	useEffect(() => {
		setupCombinedDevice();
	}, []);

	useEffect(() => {
		initSocket();
	}, [combinedStream]);

	useEffect(() => {
		if (isKicked || isDeleted || isFailed) {
			cleanCombinedStream();
		}
	}, [isKicked, isDeleted, isFailed]);

	const handleSubmitAcceptDeleteClick = () => {
		navigate({ to: "/" });
	};

	const handleSubmitAcceptKickClick = () => {
		navigate({ to: "/" });
	};

	const handleSubmitAcceptUnavailableClick = () => {
		navigate({ to: "/" });
	};

	const handleKickClick = (socketId: string) => {
		handleKick(socketId);
	};

	const onHandleMicToggle = () => {
		toggleMicMute();
	};

	const onHandleCameraToggle = () => {
		toggleCameraMute();
	};

	const onHandleSettingsSubmitClick = async (data: SettingsRoomSchemaType) => {
		const { audioDeviceId, videoDeviceId } = data;

		if (selectedAudioDevice?.deviceId !== audioDeviceId || selectedVideoDevice?.deviceId !== videoDeviceId) {
			await setupCombinedDevice();
		}
	};

	const onHandleDeleteClick = async () => {
		await deleteRoom({ id: room._id });
	};

	const onHandleLeaveSubmitClick = async () => {
		navigate({ to: "/rooms" });
	};

	return (
		<>
			{isAvailableToVisit && !isKicked && !isFailed && !isDeleted
				? (
						<Card className={cn("w-full h-full")}>
							<CardContent className="w-full h-full">
								<div className="w-full h-full flex flex-col gap-2">
									<div className={`flex-1 min-h-0 flex items-center justify-center overflow-hidden p-2 `}>
										<div className={cn("grid gap-2 md:gap-3 w-full h-full", Object.keys(remotePeers).length === 0 && "grid-cols-1", Object.keys(remotePeers).length === 1 && "grid-cols-1 sm:grid-cols-2", Object.keys(remotePeers).length === 2 && "grid-cols-1 sm:grid-cols-3", Object.keys(remotePeers).length >= 3 && "grid-cols-2")}>
											<LocaleStream isCameraRequired={room?.isCameraRequired} stream={combinedStream} />
											{
												Object.entries(remotePeers).map(([socketId, peer]) => <RemoteStream key={socketId} stream={peer.stream} isCameraRequired={room?.isCameraRequired} handleKickClick={() => handleKickClick(socketId)} isKickUserAvailable={isCreator} />)
											}
										</div>
									</div>
									<Tools isCameraRequired={room?.isCameraRequired} isMicRequired={room?.isMicRequired} isCreator={isCreator} onHandleDeleteSubmitClick={onHandleDeleteClick} onHandleCameraToggle={onHandleCameraToggle} onHandleMicToggle={onHandleMicToggle} onHandleLeaveSubmitClick={onHandleLeaveSubmitClick} onHandleSettingsSubmitClick={onHandleSettingsSubmitClick} selectedAudioDeviceId={selectedAudioDevice?.deviceId} selectedVideoDeviceId={selectedVideoDevice?.deviceId} />
								</div>
							</CardContent>
						</Card>
					)
				: null}

			<AcceptDeleteAlertDialog isOpen={isDeleted} setIsOpen={() => {}} onHandleSubmitClick={handleSubmitAcceptDeleteClick} />
			<AcceptKickAlertDialog isOpen={isKicked} setIsOpen={() => {}} onHandleSubmitClick={handleSubmitAcceptKickClick} />
			<AcceptUnavailableAlertDialog isOpen={isFailed || isErrorCheckIsCreator || isErrorIsAvailableToVisit} setIsOpen={() => {}} onHandleSubmitClick={handleSubmitAcceptUnavailableClick} />
		</>
	);
};

export default Streams;
