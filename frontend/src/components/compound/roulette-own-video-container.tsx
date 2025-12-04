import { Settings } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import type { JoinRoomSchemaType } from "@/lib/types/room";

import DialogModal from "@/components/compound/dialog-modal";
import SettingsForm from "@/components/forms/settings-form";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Video from "@/components/ui/video";
import { useMediaDevice } from "@/hooks/use-media-device";
import { cn } from "@/lib/utils/cn";
import useMediaDeviceStore from "@/store/media-device-store";

interface VideoContainerProps {
	className?: string;
	isStreamValid?: boolean;
	stream: MediaStream | null;
	isVideoAvailable?: boolean;
	isAudioAvailable?: boolean;
	audioDevices?: MediaDeviceInfo[];
	videoDevices?: MediaDeviceInfo[];
	selectedVideoDevice?: MediaDeviceInfo | null;
	selectedAudioDevice?: MediaDeviceInfo | null;
	setupVideoDevice?: (value?: string) => Promise<void>;
	setupAudioDevice?: (value?: string) => Promise<void>;
	onHandleStopClick: () => void;
	handleSettingsSubmit?: (value: JoinRoomSchemaType) => void;
}

const RouletteOwnVideoContainer = ({ className, isVideoAvailable = false, isAudioAvailable = false, isStreamValid, stream, handleSettingsSubmit }: VideoContainerProps) => {
	const formId = useId();
	const videoRef = useRef<HTMLVideoElement>(null);
	const [isHovered, setIsHovered] = useState(false);
	const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);

	const { addDevice, state: mediaDeviceStoreState } = useMediaDeviceStore();
	const { videoDevices, audioDevices, videoStream, audioStream, selectedVideoDevice, selectedAudioDevice, setupCombinedDevice, setupVideoDevice, setupAudioDevice } = useMediaDevice({ isAudioAvailable, isVideoAvailable, videoDeviceId: mediaDeviceStoreState.video || "", audioDeviceId: mediaDeviceStoreState.audio || "" });

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.srcObject = stream;
		}
	}, [stream]);

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
				<Video
					className="aspect-auto w-full h-full"
					stream={stream}
					isMuted
				/>
				<div className="p-4 w-full h-full absolute top-0 left-0 flex flex-col items-center gap-2">
					<div className="h-full w-full grid grid-rows-[1fr_1fr_1fr]">
						<div className="flex justify-end">
							<Button variant="secondary" onClick={handleOpenJoinRoomModal}><Settings /></Button>
						</div>
						{isStreamValid ? null : <span className="text-center self-center text-white">Device access denied! Give permission to the necessary devices.</span>}
					</div>
				</div>
				{isHovered}
			</div>
			<DialogModal isOpen={isSettingsModalOpen} setOpen={setSettingsModalOpen} title="Settings" description="Change your settings." submitTitle="Submit" cancelTitle="Cancel" isCancelVisible formId={formId}>
				<ScrollArea className="h-full">
					<SettingsForm formId={formId} onHandleFormChange={onHandleFormChange} onHandleSubmit={onHandleSubmit} isCameraAvailable={isVideoAvailable} isMicAvailable={isAudioAvailable} audioDevices={audioDevices} videoDevices={videoDevices} videoStream={videoStream} audioStream={audioStream} selectedVideoDevice={selectedVideoDevice} selectedAudioDevice={selectedAudioDevice} />
				</ScrollArea>
			</DialogModal>
		</>
	);
};

export default RouletteOwnVideoContainer;
