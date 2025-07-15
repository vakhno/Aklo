import { useEffect, useState } from "react";

import { useIsMobile } from "@/hooks/use-is-mobile";
import { catchError } from "@/lib/utils/catch-error";

interface useMediaDeviceProps {
	isVideoAvailable?: boolean;
	isAudioAvailable?: boolean;
	videoDeviceId?: string;
	audioDeviceId?: string;
}

const DEFAULT_IS_VIDEO_AVAILABLE = false;
const DEFAULT_IS_AUDIO_AVAILABLE = false;
const DEFAULT_VIDEO_DEVICE_ID = "";
const DEFAULT_AUDIO_DEVICE_ID = "";

export const useMediaDevice = ({ isVideoAvailable = DEFAULT_IS_VIDEO_AVAILABLE, isAudioAvailable = DEFAULT_IS_AUDIO_AVAILABLE, videoDeviceId = DEFAULT_VIDEO_DEVICE_ID, audioDeviceId = DEFAULT_AUDIO_DEVICE_ID }: useMediaDeviceProps) => {
	const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
	const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
	const [combinedStream, setCombinedStream] = useState<MediaStream | null>(null);
	const [selectedVideoDevice, setSelectedVideoDevice] = useState<MediaDeviceInfo | null>(null);
	const [selectedAudioDevice, setSelectedAudioDevice] = useState<MediaDeviceInfo | null>(null);
	const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
	const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
	const [isPermissionDenied, setIsPermissionDenied] = useState(false);
	const isMobileDevice = useIsMobile();

	const cleanVideoStream = () => {
		if (videoStream) {
			videoStream.getTracks().forEach((track) => {
				track.stop();
			});
		}
		setVideoStream(null);
	};

	const cleanAudioStream = () => {
		if (audioStream) {
			audioStream.getTracks().forEach((track) => {
				track.stop();
			});
		}
		setAudioStream(null);
	};

	const setupVideoDevice = async (deviceId?: string) => {
		if (isVideoAvailable) {
			cleanVideoStream();

			const constraints = {
				video: isVideoAvailable ? isMobileDevice ? { facingMode: "user" } : deviceId && deviceId.length ? { deviceId: { exact: deviceId } } : true : false
			};
			const [userMediaError, stream] = await catchError({ promise: navigator.mediaDevices.getUserMedia(constraints) });

			if (userMediaError) {
				setIsPermissionDenied(true);

				throw userMediaError;
			}
			else {
				setIsPermissionDenied(false);
				setVideoStream(stream);

				const [enumerateDevicesError, allDevices] = await catchError({ promise: navigator.mediaDevices.enumerateDevices() });

				if (enumerateDevicesError) {
					throw enumerateDevicesError;
				}
				else {
					const allVideoDevices = allDevices.filter(device => device.kind === "videoinput");

					setVideoDevices(allVideoDevices);

					if (isMobileDevice) {
						const activeDevice = allVideoDevices.length > 0
							? allVideoDevices[0]
							: {
									deviceId: "default",
									groupId: "default",
									kind: "videoinput" as MediaDeviceKind,
									label: "Camera"
								} as MediaDeviceInfo;
						setSelectedVideoDevice(activeDevice);
					}
					else {
						const selectedDevice = allVideoDevices.find(device => device.deviceId === deviceId);

						if (selectedDevice) {
							setSelectedVideoDevice(selectedDevice);
						}
						else {
							setSelectedVideoDevice(allVideoDevices[0]);
						}
					}
				}
			}
		}
	};

	const setupAudioDevice = async (deviceId?: string) => {
		if (isAudioAvailable) {
			cleanAudioStream();

			const constraints = {
				audio: isAudioAvailable ? isMobileDevice ? true : deviceId && deviceId.length ? { deviceId: { exact: deviceId } } : true : false
			};

			const [userMediaError, stream] = await catchError({ promise: navigator.mediaDevices.getUserMedia(constraints) });

			if (userMediaError) {
				setIsPermissionDenied(true);
				throw userMediaError;
			}
			else {
				setIsPermissionDenied(false);
				setAudioStream(stream);

				const [enumerateDevicesError, allDevices] = await catchError({ promise: navigator.mediaDevices.enumerateDevices() });

				if (enumerateDevicesError) {
					throw enumerateDevicesError;
				}
				else {
					const allAudioDevices = allDevices.filter(device => device.kind === "audioinput");

					setAudioDevices(allAudioDevices);

					if (isMobileDevice) {
						const activeDevice = allAudioDevices.length > 0
							? allAudioDevices[0]
							: {
									deviceId: "default",
									groupId: "default",
									kind: "audioinput" as MediaDeviceKind,
									label: "Microphone"
								} as MediaDeviceInfo;

						setSelectedAudioDevice(activeDevice);
					}
					else {
						const selectedDevice = allAudioDevices.find(device => device.deviceId === deviceId);

						if (selectedDevice) {
							setSelectedAudioDevice(selectedDevice);
						}
						else {
							setSelectedAudioDevice(allAudioDevices[0]);
						}
					}
				}
			}
		}
	};

	const setupDeviceStreams = async () => {
		const [[videoDeviceError], [audioDeviceError]] = await Promise.all([catchError({ promise: setupVideoDevice(videoDeviceId) }), catchError({ promise: setupAudioDevice(audioDeviceId) })]);

		if (videoDeviceError) {
			throw videoDeviceError;
		}

		if (audioDeviceError) {
			throw audioDeviceError;
		}
	};

	useEffect(() => {
		const newCombinedStream = new MediaStream();
		if (videoStream) {
			videoStream.getVideoTracks().forEach(track => newCombinedStream.addTrack(track));
		}
		if (audioStream) {
			audioStream.getAudioTracks().forEach(track => newCombinedStream.addTrack(track));
		}
		setCombinedStream(newCombinedStream.getTracks().length > 0 ? newCombinedStream : null);
	}, [videoStream, audioStream]);

	useEffect(() => {
		return () => {
			if (videoStream) {
				videoStream.getTracks().forEach(track => track.stop());
			}
		};
	}, [videoStream]);

	useEffect(() => {
		return () => {
			if (audioStream) {
				audioStream.getTracks().forEach(track => track.stop());
			}
		};
	}, [audioStream]);

	return {
		videoStream,
		audioStream,
		combinedStream,
		selectedVideoDevice,
		selectedAudioDevice,
		videoDevices,
		audioDevices,
		isMobileDevice,
		isPermissionDenied,
		cleanVideoStream,
		cleanAudioStream,
		setupVideoDevice,
		setupAudioDevice,
		setupDeviceStreams
	};
};
