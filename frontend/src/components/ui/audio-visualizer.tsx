import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils/cn";

interface AudioVisualizerProps {
	stream: MediaStream | null;
	className?: string;
}

const AudioVisualizer = ({ stream, className = "" }: AudioVisualizerProps) => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const animationRef = useRef<number | null>(null);

	const drawBars = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, dataArray: Uint8Array, bufferLength: number) => {
		const barWidth = (canvas.width / bufferLength) * 2.5;
		let x = 0;

		for (let i = 0; i < bufferLength; i++) {
			const barHeight = (dataArray[i] / 255) * canvas.height * 0.8;

			ctx.fillStyle = "rgb(255, 255, 255)";
			ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

			x += barWidth + 1;
		}
	};

	useEffect(() => {
		if (!stream)
			return;

		let audioContext: AudioContext;
		let analyser: AnalyserNode;

		const startVisualization = () => {
			const canvas = canvasRef.current;
			if (!canvas || !analyser)
				return;

			const ctx = canvas.getContext("2d")!;
			const bufferLength = analyser.frequencyBinCount;
			const dataArray = new Uint8Array(bufferLength);

			const draw = () => {
				animationRef.current = requestAnimationFrame(draw);
				analyser.getByteFrequencyData(dataArray);

				ctx.fillStyle = "rgb(10, 10, 20)";
				ctx.fillRect(0, 0, canvas.width, canvas.height);

				drawBars(ctx, canvas, dataArray, bufferLength);
			};

			draw();
		};

		const initAudio = async () => {
			try {
				audioContext = new window.AudioContext();
				analyser = audioContext.createAnalyser();
				analyser.fftSize = 256;
				analyser.smoothingTimeConstant = 0.8;

				const source = audioContext.createMediaStreamSource(stream);
				source.connect(analyser);

				startVisualization();
			}
			catch (err) {
				console.error("Error initializing audio:", err);
			}
		};

		initAudio();

		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
			if (audioContext?.state !== "closed") {
				audioContext?.close();
			}
		};
	}, [stream]);

	return (
		<div className={cn(className)}>
			<canvas
				ref={canvasRef}
				className="w-full h-full rounded-lg border-2 border-gray-300 bg-black"
			/>
		</div>
	);
};

export default AudioVisualizer;
