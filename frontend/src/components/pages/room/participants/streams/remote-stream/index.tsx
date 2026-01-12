import { Loader, RefreshCw, UserMinus, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { LiveWaveform } from "@/components/ui/live-waveform";
import { Slider } from "@/components/ui/slider";
import Video from "@/components/ui/video";
import { cn } from "@/lib/utils/cn";

interface VideoContainerProps {
	className?: string;
	isCameraRequired: boolean;
	isLoading?: boolean;
	isRecovering?: boolean;
	stream: MediaStream | null;
	isKickUserAvailable?: boolean;
	isVolumeSliderAvailable?: boolean;
	handleKickClick?: () => void;
}

const GuestVideoContainer = ({ className, isCameraRequired, isLoading, isRecovering, stream, isKickUserAvailable, isVolumeSliderAvailable, handleKickClick }: VideoContainerProps) => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [isMuted, setIsMuted] = useState(false);
	const [volume, setVolume] = useState(0.5);
	const [isHovered, setIsHovered] = useState(false);

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.srcObject = stream;
			videoRef.current.muted = isMuted;
			videoRef.current.volume = volume;
		}
	}, [stream, isMuted, volume]);

	const toggleMute = () => {
		setIsMuted((prev) => {
			const newMutedState = !prev;
			if (newMutedState) {
				setVolume(0);
			}
			else {
				setVolume(0.5);
			}
			return newMutedState;
		});
	};

	const handleVolumeChange = (value: number[]) => {
		const newVolume = value[0] / 100;
		setVolume(newVolume);
		if (newVolume > 0 && isMuted) {
			setIsMuted(false);
		}
		else if (newVolume === 0 && !isMuted) {
			setIsMuted(true);
		}
	};

	const onHandleKickClick = () => {
		handleKickClick?.();
	};

	return (
		<div
			className={cn(
				"w-full h-full relative",
				className
			)}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{ isCameraRequired
				? <Video ref={videoRef} className="aspect-auto w-full h-full" />
				: <LiveWaveform stream={stream} active={true} processing={true} barWidth={3} barGap={2} mode="static" height="100%" fadeEdges={true} barColor="gray" historySize={120} />}
			{isLoading && (
				<div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-10 bg-black/50 rounded-full p-2">
					<Loader className="w-6 h-6 text-white animate-spin" />
				</div>
			)}

			{isRecovering && (
				<div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-10 bg-black/50 rounded-full p-2">
					<RefreshCw className="w-6 h-6 text-white animate-spin" />
				</div>
			)}

			{isHovered && (
				<div className="absolute bottom-4 right-4 flex items-center gap-2">
					{isVolumeSliderAvailable
						? (
								<>
									<Button
										onClick={toggleMute}
										aria-label={isMuted ? "Unmute" : "Mute"}
									>
										{isMuted
											? (
													<VolumeX className="w-10 h-10" />
												)
											: (
													<Volume2 className="w-10 h-10" />
												)}
									</Button>
									<div className="w-24">
										<Slider
											value={[volume * 100]}
											onValueChange={handleVolumeChange}
											max={100}
											step={1}
											className="text-white"
											aria-label="Volume control"
										/>
									</div>
								</>
							)
						: null}
					{isKickUserAvailable
						? (
								<Button
									variant="destructive"
									aria-label="Kick user"
									onClick={onHandleKickClick}
								>
									<UserMinus className="w-10 h-10" />
								</Button>
							)
						: null}
				</div>
			)}
		</div>
	);
};

export default GuestVideoContainer;

// import type { RemotePeer } from "@/hooks/use-webrtc";
// import type { RoomType } from "@/lib/types/room";

// import GuestVideoContainer from "@/components/compound/guest-video-container";

// interface RemoteStreamProps {
// 	room: RoomType;
// 	peers: Record<string, RemotePeer>;
// 	isCreator?: boolean;
// 	handleKickClick: (socketId: string) => void;
// }

// const RemoteStream = ({ room, peers, isCreator, handleKickClick }: RemoteStreamProps) => {
// 	return (
// 		<>
// 			{
// 				Object.entries(peers).map(([socketId, peer]) => <GuestVideoContainer isCameraRequired={room.isCameraRequired} stream={peer.stream} isKickUserAvailable={isCreator} isVolumeSliderAvailable handleKickClick={() => handleKickClick(socketId)} className="flex-1 w-full h-full overflow-hidden" key={socketId} />)
// 			}
// 		</>
// 	);
// };

// export default RemoteStream;
