import { useNavigate } from "@tanstack/react-router";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

import type { RoomType, SettingsRoomSchemaType } from "@/lib/types/room";

import { Card, CardContent } from "@/components/ui/card";
import { useMediaDevice } from "@/hooks/use-media-device";
import { useWebRTC } from "@/hooks/use-webrtc";
import { cn } from "@/lib/utils/cn";
import { useCheckIsCreator, useDeleteRoom, useIsAvailableToVisit } from "@/queries/room";
import useMediaDeviceStore from "@/store/media-device-store";

import AcceptDeleteAlertDialog from "./accept-delete-alert-dialog";
import AcceptKickAlertDialog from "./accept-kick-alert-dialog";
import AcceptUnavailableAlertDialog from "./accept-unavailable-alert-dialog";
import LocaleStream from "./locale-stream";
import RemoteStream from "./remote-stream";
import Tools from "./tools";

interface StreamsProps {
	room: RoomType;
}

const Streams = ({ room }: StreamsProps) => {
	const navigate = useNavigate();

	const { state: mediaDeviceStoreState } = useMediaDeviceStore();
	const { mutate: deleteRoom } = useDeleteRoom({});
	const { combinedStream, selectedAudioDevice, selectedVideoDevice, setupCombinedDevice, cleanCombinedStream, toggleCameraMute, toggleMicMute } = useMediaDevice({ isAudioAvailable: room?.isMicRequired, isVideoAvailable: room?.isCameraRequired, videoDeviceId: mediaDeviceStoreState.video || "", audioDeviceId: mediaDeviceStoreState.audio || "" });
	const { data: IsAvailableToVisit, isPending: isPendingIsAvailableToVisit, isError: isErrorIsAvailableToVisit } = useIsAvailableToVisit({ id: room._id, options: { refetchOnWindowFocus: false, refetchOnReconnect: false, refetchOnMount: false, refetchInterval: false, staleTime: Infinity } });
	const { data: isCreator, isPending: isPendingCheckIsCreator, isError: isErrorCheckIsCreator } = useCheckIsCreator({ id: room._id, options: { refetchOnWindowFocus: false, refetchOnReconnect: false, refetchOnMount: false, refetchInterval: false, staleTime: Infinity } });
	const { remotePeers, isKicked, isFailed, isDeleted, handleKick, initSocket } = useWebRTC({ roomId: room._id, localStream: combinedStream });
	const [isAcceptDeleteAlertDialogOpen, setIsAcceptDeleteAlertDialogOpen] = useState(false);
	const [isAcceptKickAlertDialogOpen, setIsAcceptKickAlertDialogOpen] = useState(false);
	const [isAcceptUnavailableAlertDialogOpen, setIsAcceptUnavailableAlertDialogOpen] = useState(false);

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
	}, [isKicked, isDeleted]);

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
		navigate({ to: "/" });
	};

	if (isPendingCheckIsCreator || isPendingIsAvailableToVisit) {
		return (
			<div className="w-full h-full flex items-center justify-center">
				<Loader className="w-6 h-6 text-red animate-spin" />
			</div>
		);
	}

	if (isErrorCheckIsCreator || isErrorIsAvailableToVisit) {
		return (
			<div className="w-full h-full flex items-center justify-center">
				Error
			</div>
		);
	}

	return (
		<>
			{IsAvailableToVisit && !isKicked && !isFailed && !isDeleted
				? (
						<Card className={cn("w-full h-full")}>
							<CardContent className="w-full h-full">
								<div className="w-full h-full flex flex-col gap-2">
									<div className={`flex-1 min-h-0 flex items-center justify-center overflow-hidden p-2 `}>
										<div className={cn("grid gap-2 md:gap-3 w-full h-full", Object.keys(remotePeers).length === 0 && "grid-cols-1", Object.keys(remotePeers).length === 1 && "grid-cols-1 sm:grid-cols-2", Object.keys(remotePeers).length === 2 && "grid-cols-1 sm:grid-cols-3", Object.keys(remotePeers).length >= 3 && "grid-cols-2")}>
											<LocaleStream isCameraRequired={room?.isCameraRequired} stream={combinedStream} />
											{
												Object.entries(remotePeers).map(([socketId, peer]) => <RemoteStream key={socketId} stream={peer.stream} isCameraRequired={room?.isCameraRequired} handleKickClick={() => handleKickClick(socketId)} />)
											}
										</div>
									</div>
									<Tools isCameraRequired={room?.isCameraRequired} isMicRequired={room?.isMicRequired} isCreator={isCreator} onHandleDeleteSubmitClick={onHandleDeleteClick} onHandleCameraToggle={onHandleCameraToggle} onHandleMicToggle={onHandleMicToggle} onHandleLeaveSubmitClick={onHandleLeaveSubmitClick} onHandleSettingsSubmitClick={onHandleSettingsSubmitClick} selectedAudioDeviceId={selectedAudioDevice?.deviceId} selectedVideoDeviceId={selectedVideoDevice?.deviceId} />
								</div>
							</CardContent>
						</Card>
					)
				: null}

			<AcceptDeleteAlertDialog isOpen={isAcceptDeleteAlertDialogOpen} setIsOpen={setIsAcceptDeleteAlertDialogOpen} onHandleSubmitClick={handleSubmitAcceptDeleteClick} />
			<AcceptKickAlertDialog isOpen={isAcceptKickAlertDialogOpen} setIsOpen={setIsAcceptKickAlertDialogOpen} onHandleSubmitClick={handleSubmitAcceptKickClick} />
			<AcceptUnavailableAlertDialog isOpen={isAcceptUnavailableAlertDialogOpen} setIsOpen={setIsAcceptUnavailableAlertDialogOpen} onHandleSubmitClick={handleSubmitAcceptUnavailableClick} />
		</>
	);
};

export default Streams;
