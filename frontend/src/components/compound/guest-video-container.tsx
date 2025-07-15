import { UserMinus, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import Video from "@/components/ui/video";
import { cn } from "@/lib/utils/cn";

interface VideoContainerProps {
	className?: string;
	stream: MediaStream | null;
	isKickUserAvailable?: boolean;
	isVolumeSliderAvailable?: boolean;
}

const GuestVideoContainer = ({ className, stream, isKickUserAvailable, isVolumeSliderAvailable }: VideoContainerProps) => {
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
