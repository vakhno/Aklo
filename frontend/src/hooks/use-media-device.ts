import { useEffect, useState } from "react";

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
	const [selectedVideoDevice, setSelectedVideoDevice] = useState<MediaDeviceInfo | null>(null);
	const [selectedAudioDevice, setSelectedAudioDevice] = useState<MediaDeviceInfo | null>(null);
	const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
	const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);

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
				video: isVideoAvailable ? deviceId && deviceId.length ? { deviceId: { exact: deviceId } } : true : false
			};

			const [userMediaError, stream] = await catchError({ promise: navigator.mediaDevices.getUserMedia(constraints) });

			if (userMediaError) {
				throw userMediaError;
			}
			else {
				setVideoStream(stream);

				const [enumerateDevicesError, allDevices] = await catchError({ promise: navigator.mediaDevices.enumerateDevices() });

				if (enumerateDevicesError) {
					throw enumerateDevicesError;
				}
				else {
					const allVideoDevices = allDevices.filter(device => device.kind === "videoinput");

					setVideoDevices(allVideoDevices);

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
	};

	const setupAudioDevice = async (deviceId?: string) => {
		if (isAudioAvailable) {
			cleanAudioStream();

			const constraints = {
				audio: isAudioAvailable ? deviceId && deviceId.length ? { deviceId: { exact: deviceId } } : true : false
			};

			const [userMediaError, stream] = await catchError({ promise: navigator.mediaDevices.getUserMedia(constraints) });

			if (userMediaError) {
				throw userMediaError;
			}
			else {
				setAudioStream(stream);

				const [enumerateDevicesError, allDevices] = await catchError({ promise: navigator.mediaDevices.enumerateDevices() });

				if (enumerateDevicesError) {
					throw enumerateDevicesError;
				}
				else {
					const allAudioDevices = allDevices.filter(device => device.kind === "audioinput");

					setAudioDevices(allAudioDevices);

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
		selectedVideoDevice,
		selectedAudioDevice,
		videoDevices,
		audioDevices,
		cleanVideoStream,
		cleanAudioStream,
		setupVideoDevice,
		setupAudioDevice,
		setupDeviceStreams
	};
};
