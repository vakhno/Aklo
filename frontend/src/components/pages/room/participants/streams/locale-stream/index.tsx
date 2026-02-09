import { useEffect, useRef } from "react";

import { LiveWaveform } from "@/components/ui/live-waveform";
import Video from "@/components/ui/video";
import { cn } from "@/lib/utils/cn";

interface LocaleStreamProps {
	className?: string;
	stream: MediaStream | null;
	isCameraRequired?: boolean;
}

const LocaleStream = ({ className, stream, isCameraRequired }: LocaleStreamProps) => {
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.srcObject = stream;
			videoRef.current.muted = true;
		}
	}, [stream]);

	return (
		<div
			className={cn(
				"w-full h-full relative flex-1 overflow-hidden",
				className
			)}
		>
			{ isCameraRequired
				? <Video ref={videoRef} className="aspect-auto w-full h-full" />
				: <LiveWaveform stream={stream} active={true} processing={true} barWidth={3} barGap={2} height="100%" mode="static" fadeEdges={true} barColor="gray" historySize={120} />}
		</div>
	);
};

export default LocaleStream;
