import { useEffect, useState } from "react";

import { useIsMobile } from "@/hooks/use-is-mobile";
import { catchError } from "@/lib/utils/catch-error";

interface useMediaDeviceProps {
	isVideoAvailable?: boolean;
	isAudioAvailable?: boolean;
	videoDeviceId?: string | null;
	audioDeviceId?: string | null;
}

export const useMediaDevice = ({ isVideoAvailable = false, isAudioAvailable = false, videoDeviceId = null, audioDeviceId = null }: useMediaDeviceProps) => {
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

	const cleanCombinedStream = () => {
		if (combinedStream) {
			combinedStream.getTracks().forEach((track) => {
				track.stop();
			});
		}
		setCombinedStream(null);
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

	const setupCombinedDevice = async () => {
		cleanCombinedStream();

		const constraints = {
			video: isVideoAvailable ? isMobileDevice ? { facingMode: "user" } : videoDeviceId && videoDeviceId.length ? { deviceId: { exact: videoDeviceId } } : true : false,
			audio: isAudioAvailable ? isMobileDevice ? true : audioDeviceId && audioDeviceId.length ? { deviceId: { exact: audioDeviceId } } : true : false
		};

		const [userMediaError, stream] = await catchError({ promise: navigator.mediaDevices.getUserMedia(constraints) });

		if (userMediaError) {
			setIsPermissionDenied(true);
			throw userMediaError;
		}
		else {
			setIsPermissionDenied(false);

			const videoTracks = stream.getVideoTracks();
			const audioTracks = stream.getAudioTracks();

			if (videoTracks.length > 0) {
				const videoStream = new MediaStream(videoTracks);
				setVideoStream(videoStream);
			}

			if (audioTracks.length > 0) {
				const audioStream = new MediaStream(audioTracks);
				setAudioStream(audioStream);
			}

			setCombinedStream(stream);

			const [enumerateDevicesError, allDevices] = await catchError({ promise: navigator.mediaDevices.enumerateDevices() });

			if (enumerateDevicesError) {
				throw enumerateDevicesError;
			}
			else {
				const allVideoDevices = allDevices.filter(device => device.kind === "videoinput");
				const allAudioDevices = allDevices.filter(device => device.kind === "audioinput");

				setVideoDevices(allVideoDevices);
				setAudioDevices(allAudioDevices);

				if (isMobileDevice) {
					const activeAudioDevice = allAudioDevices.length > 0
						? allAudioDevices[0]
						: {
								deviceId: "default",
								groupId: "default",
								kind: "audioinput" as MediaDeviceKind,
								label: "Microphone"
							} as MediaDeviceInfo;

					setSelectedAudioDevice(activeAudioDevice);

					const activeVideoDevice = allVideoDevices.length > 0
						? allVideoDevices[0]
						: {
								deviceId: "default",
								groupId: "default",
								kind: "videoinput" as MediaDeviceKind,
								label: "Camera"
							} as MediaDeviceInfo;
					setSelectedVideoDevice(activeVideoDevice);
				}
				else {
					const selectedAudioDevice = allAudioDevices.find(device => device.deviceId === audioDeviceId);

					if (selectedAudioDevice) {
						setSelectedAudioDevice(selectedAudioDevice);
					}
					else {
						setSelectedAudioDevice(allAudioDevices[0]);
					}

					const selectedVideoDevice = allVideoDevices.find(device => device.deviceId === videoDeviceId);

					if (selectedVideoDevice) {
						setSelectedVideoDevice(selectedVideoDevice);
					}
					else {
						setSelectedVideoDevice(allVideoDevices[0]);
					}
				}
			}
		}
	};

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
		setupCombinedDevice
	};
};
