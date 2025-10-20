import { Settings } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import Video from "@/components/ui/video";
import { cn } from "@/lib/utils/cn";

import SettingsModal from "./settings-modal";

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
}

const RouletteOwnVideoContainer = ({ className, isVideoAvailable = false, isAudioAvailable = false, isStreamValid, stream }: VideoContainerProps) => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [isHovered, setIsHovered] = useState(false);
	const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.srcObject = stream;
		}
	}, [stream]);

	const handleOpenJoinRoomModal = () => {
		setSettingsModalOpen(true);
	};

	return (
		<>
			<div
				className={cn(
					"w-full h-full max-w-max max-h-max relative top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] aspect-square",
					className
				)}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<Video
					className="aspect-square"
					stream={stream}
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
			{ isSettingsModalOpen
				&& <SettingsModal isCameraAvailable={isVideoAvailable} isMicAvailable={isAudioAvailable} isOpen={isSettingsModalOpen} setOpen={setSettingsModalOpen} />}
		</>
	);
};

export default RouletteOwnVideoContainer;
