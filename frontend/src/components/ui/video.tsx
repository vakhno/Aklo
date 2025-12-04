import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils/cn";

interface VideoProps {
	className?: string;
	stream: MediaStream | null;
	isMuted?: boolean;
}

const Video = ({ className, stream, isMuted = false }: VideoProps) => {
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
				muted={isMuted}
				autoPlay
				disablePictureInPicture={true}
				controls={false}
				playsInline
				className="w-full h-full max-w-full max-h-full rounded-lg border-2 border-gray-300 object-cover bg-black"
			/>
		</div>
	);
};

export default Video;
