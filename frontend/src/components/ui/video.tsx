import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils/cn";

interface VideoProps {
	className?: string;
	stream: MediaStream | null;
}

const Video = ({ className, stream }: VideoProps) => {
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.srcObject = stream;
		}
	}, [stream]);

	return (
		<div className={cn(className)}>
			<video
				ref={videoRef}
				muted
				autoPlay
				className="w-full h-full max-w-full max-h-full rounded-lg border-2 border-gray-300 object-cover"
			/>
		</div>
	);
};

export default Video;
