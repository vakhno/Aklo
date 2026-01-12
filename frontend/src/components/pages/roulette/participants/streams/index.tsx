import { useEffect } from "react";

import type { SettingsRoomSchemaType } from "@/lib/types/room";
import type { RouletteType } from "@/lib/types/roulette";

import { Card, CardContent } from "@/components/ui/card";
import { useMediaDevice } from "@/hooks/use-media-device";
import { useRouletteWebRTC } from "@/hooks/use-roulette-webrtc";
import useMediaDeviceStore from "@/store/media-device-store";

import LocaleStream from "./locale-stream";
import RemoteStream from "./remote-stream";
import Tools from "./tools";

interface StreamsProps {
	roulette: RouletteType;
}
const Streams = ({ roulette }: StreamsProps) => {
	const { state: mediaDeviceStoreState } = useMediaDeviceStore();
	const { setupCombinedDevice, combinedStream, selectedVideoDevice, selectedAudioDevice } = useMediaDevice({ isAudioAvailable: true, isVideoAvailable: true, videoDeviceId: mediaDeviceStoreState.video, audioDeviceId: mediaDeviceStoreState.audio });
	const { remotePeer, isSearching, isFound, handleStartSearch, handlePauseSearch, handleStopSearch, handleSkipOpponent, initSocket } = useRouletteWebRTC({ localStream: combinedStream, rouletteId: roulette._id });

	useEffect(() => {
		setupCombinedDevice();
	}, []);

	useEffect(() => {
		initSocket();
	}, [combinedStream]);

	const handleSkipClick = () => {
		handleSkipOpponent();
	};

	const handleStartClick = () => {
		handleStartSearch();
	};

	const handlePauseClick = () => {
		handlePauseSearch();
	};

	const handleStopClick = () => {
		handleStopSearch();
	};

	const handleSettingsSubmit = async (data: SettingsRoomSchemaType) => {
		const { audioDeviceId, videoDeviceId } = data;

		if (selectedAudioDevice?.deviceId !== audioDeviceId || selectedVideoDevice?.deviceId !== videoDeviceId) {
			await setupCombinedDevice();
		}
	};

	return (
		<Card className="w-full h-full">
			<CardContent className="w-full h-full">
				<div className="w-full h-full flex flex-col gap-2">
					<div className="overflow-hidden flex-1 w-full h-full">
						<div className="flex max-sm:flex-col gap-2 w-full h-full justify-center">
							<LocaleStream isCameraRequired={roulette?.isCameraRequired} stream={combinedStream} />
							<RemoteStream className="flex-1 w-full h-full overflow-hidden" stream={remotePeer?.stream || null} isLoading={isSearching} isFound={isFound} />
						</div>
					</div>
					<Tools isCameraRequired={roulette?.isCameraRequired} isMicRequired={roulette?.isMicRequired} isLoading={isSearching} isFound={isFound} onHandleSettingsSubmitClick={handleSettingsSubmit} handlePauseClick={handlePauseClick} handleStartClick={handleStartClick} handleStopClick={handleStopClick} onHandleSkipClick={handleSkipClick} selectedAudioDeviceId={selectedAudioDevice?.deviceId} selectedVideoDeviceId={selectedVideoDevice?.deviceId} />
				</div>
			</CardContent>
		</Card>
	);
};

export default Streams;
