import { CircleArrowRight, CirclePause, Loader, Play, RefreshCw, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import Video from "@/components/ui/video";
import { cn } from "@/lib/utils/cn";

interface VideoContainerProps {
	className?: string;
	isLoading?: boolean;
	isFound?: boolean;
	isReadyToStart?: boolean;
	isRecovering?: boolean;
	stream: MediaStream | null;
	isVolumeSliderAvailable?: boolean;
	onHandleSkipClick: () => void;
	onHandleStopClick: () => void;
	onHandleStartClick: () => void;
}

const RouletteGuestVideoContainer = ({ className, isLoading, isFound, isRecovering, stream, onHandleSkipClick, onHandleStopClick, onHandleStartClick }: VideoContainerProps) => {
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

	const handleStartClick = () => {
		onHandleStartClick();
	};

	const handleStopClick = () => {
		onHandleStopClick();
	};

	return (
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

			<div className="p-4 w-full h-full absolute z-0 top-0 left-0 flex flex-col items-center gap-2">
				<div className="h-full w-full grid grid-rows-[1fr_1fr_1fr]">
					<div></div>
					<div className="flex w-full justify-center items-center">
						{ isLoading
							? (
									<div className="flex gap-2">
										<Button variant="secondary" aria-label="Stop search" onClick={handleStopClick}><CirclePause /></Button>
										{isFound
											? <Button variant="destructive" aria-label="Kick user" onClick={onHandleSkipClick}><CircleArrowRight /></Button>
											: null}
									</div>
								)
							: <Button variant="secondary" onClick={handleStartClick}><Play /></Button>}
						{isLoading && (
							<div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-[-1] bg-black/50 rounded-full p-2">
								<Loader className="w-34 h-34 text-white animate-spin" />
							</div>
						)}

						{isRecovering && (
							<div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-[-1] bg-black/50 rounded-full p-2">
								<RefreshCw className="w-34 h-34 text-white animate-spin" />
							</div>
						)}
					</div>
					{isHovered && (
						<div className="flex items-end">

							<div className="flex items-center gap-2 w-full">
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
								<Slider
									value={[volume * 100]}
									onValueChange={handleVolumeChange}
									max={100}
									step={1}
									className="text-white"
									aria-label="Volume control"
								/>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default RouletteGuestVideoContainer;
