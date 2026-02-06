import type { RefObject } from "react";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils/cn";

interface VideoProps {
	className?: string;
	stream?: MediaStream | null;
}

const Video = ({ ref, className, stream }: VideoProps & { ref?: RefObject<HTMLVideoElement | null> }) => {
	const internalRef = useRef<HTMLVideoElement>(null);
	const videoRef = ref || internalRef;

	useEffect(() => {
		if (videoRef.current) {
			if (stream) {
				videoRef.current.srcObject = stream;
			}
		}
	}, [stream]);

	return (
		<div className={cn(className, "relative")}>
			<video
				ref={videoRef}
				autoPlay
				playsInline
				disablePictureInPicture
				controls={false}
				className="absolute inset-0 h-full w-full max-w-full max-h-full rounded-xl object-cover bg-black"
			/>
		</div>
	);
};

export default Video;
