import { LogOut, Settings, Trash } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import type { JoinRoomSchemaType, RoomType } from "@/lib/types/room";

import AlertDialogModal from "@/components/compound/alert-dialog-modal";
import DialogModal from "@/components/compound/dialog-modal";
import SettingsForm from "@/components/forms/settings-form";
import Audio from "@/components/ui/audio-visualizer";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Video from "@/components/ui/video";
import { useMediaDevice } from "@/hooks/use-media-device";
import { cn } from "@/lib/utils/cn";
import useMediaDeviceStore from "@/store/media-device-store";

interface VideoContainerProps {
	room: RoomType;
	className?: string;
	stream: MediaStream | null;
	isCreator?: boolean;
	handleDelete?: (value: RoomType) => Promise<void>;
	handleSettingsSubmit?: (value: JoinRoomSchemaType) => void;
}

const OwnerVideoContainer = ({ room, className, stream, isCreator, handleDelete, handleSettingsSubmit }: VideoContainerProps) => {
	const formId = useId();
	const { isCameraRequired, isMicRequired } = room;
	const { addDevice, state: mediaDeviceStoreState } = useMediaDeviceStore();
	const { videoDevices, audioDevices, videoStream, audioStream, selectedVideoDevice, selectedAudioDevice, setupCombinedDevice, setupVideoDevice, setupAudioDevice } = useMediaDevice({ isAudioAvailable: isMicRequired, isVideoAvailable: isCameraRequired, videoDeviceId: mediaDeviceStoreState.video || "", audioDeviceId: mediaDeviceStoreState.audio || "" });
	const [isOpen, setIsOpen] = useState(false);
	const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);

	const videoRef = useRef<HTMLVideoElement>(null);
	const [isHovered, setIsHovered] = useState(false);

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.srcObject = stream;
		}
	}, [stream]);

	const handleDeleteRoom = async () => {
		handleDelete && await handleDelete(room);
	};

	const handleDeleteRoomClick = async () => {
		setIsOpen(true);
	};

	const handleOpenJoinRoomModal = () => {
		setSettingsModalOpen(true);
	};

	const onHandleSubmit = (data: JoinRoomSchemaType) => {
		handleSettingsSubmit && handleSettingsSubmit(data);
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
			<div
				className={cn(
					"w-full h-full relative",
					className
				)}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				{ isCameraRequired
					? <Video stream={stream} className="aspect-auto w-full h-full" isMuted />
					: <Audio stream={stream} className="aspect-auto w-full h-full" />}
				{isHovered && (
					<div className="absolute bottom-4 right-4 flex items-center gap-2">
						{ isCreator
							? (
									<Button
										onClick={handleDeleteRoomClick}
										variant="destructive"
										aria-label="Kick user"
									>
										<Trash className="w-10 h-10" />
									</Button>
								)
							: (
									<Button
										variant="destructive"
										aria-label="Leave"
									>
										<LogOut className="w-10 h-10" />
									</Button>
								)}
						<Button variant="secondary" onClick={handleOpenJoinRoomModal}><Settings /></Button>

					</div>
				)}
			</div>

			<DialogModal isOpen={isSettingsModalOpen} setOpen={setSettingsModalOpen} title="Settings" description="Change your settings." submitTitle="Submit" cancelTitle="Cancel" isCancelVisible formId={formId}>
				<ScrollArea className="h-full">
					<SettingsForm formId={formId} onHandleFormChange={onHandleFormChange} onHandleSubmit={onHandleSubmit} isCameraAvailable={isCameraRequired} isMicAvailable={isMicRequired} audioDevices={audioDevices} videoDevices={videoDevices} videoStream={videoStream} audioStream={audioStream} selectedVideoDevice={selectedVideoDevice} selectedAudioDevice={selectedAudioDevice} />
				</ScrollArea>
			</DialogModal>

			<AlertDialogModal
				isOpen={isOpen}
				setOpen={setIsOpen}
				title="Delete Room"
				description="Are you sure you want to delete this room? This action cannot be undone and all participants will be disconnected."
				submitTitle="Delete Room"
				cancelTitle="Cancel"
				isCancelVisible
				onSubmit={handleDeleteRoom}
			/>
		</>
	);
};

export default OwnerVideoContainer;
