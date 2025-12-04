import { useParams } from "@tanstack/react-router";
import { useEffect } from "react";

import type { JoinRoomSchemaType } from "@/lib/types/room";

import RouletteGuestVideoContainer from "@/components/compound/roulette-guest-video-container";
import RouletteOwnVideoContainer from "@/components/compound/roulette-own-video-container";
import RuleWarningMessage from "@/components/compound/rule-warning-message";
import { Card, CardContent } from "@/components/ui/card";
import { useMediaDevice } from "@/hooks/use-media-device";
import { useRouletteWebRTC } from "@/hooks/use-roulette-webrtc";
import useMediaDeviceStore from "@/store/media-device-store";

function RouletteCard() {
	const { id } = useParams({ from: "/roulette/$id" });
	const { state: mediaDeviceStoreState } = useMediaDeviceStore();
	const { setupCombinedDevice, setupVideoDevice, setupAudioDevice, combinedStream, audioDevices, videoDevices, selectedVideoDevice, selectedAudioDevice, isPermissionDenied } = useMediaDevice({ isAudioAvailable: true, isVideoAvailable: true, videoDeviceId: mediaDeviceStoreState.video, audioDeviceId: mediaDeviceStoreState.audio });
	const { myStream, remoteStream, isSearching, isFound, startSearch, pauseSearch, stopSearch, skipOpponent, initSocket } = useRouletteWebRTC(combinedStream, id);

	useEffect(() => {
		(async () => {
			await setupCombinedDevice();
		})();
	}, []);

	useEffect(() => {
		if (combinedStream) {
			initSocket();
		}
	}, [combinedStream]);

	const handleSkipClick = () => {
		skipOpponent();
	};

	const handleStartClick = () => {
		startSearch();
	};

	const handlePauseClick = () => {
		pauseSearch();
	};

	const handleStopClick = () => {
		stopSearch();
	};

	const handleSettingsSubmit = async (data: JoinRoomSchemaType) => {
		const { audioDeviceId, videoDeviceId } = data;

		if (selectedAudioDevice?.deviceId !== audioDeviceId || selectedVideoDevice?.deviceId !== videoDeviceId) {
			await setupCombinedDevice();
		}
	};

	return (
		<>
			<Card className="h-[calc(100vh-var(--header-height)-var(--header-margin-bottom))]">
				<CardContent className="w-full h-full">
					<div className="w-full h-full flex flex-col gap-2">
						<div className="overflow-hidden flex-1 w-full h-full">
							<div className="flex max-sm:flex-col gap-2 w-full h-full justify-center">
								<RouletteOwnVideoContainer isStreamValid={!isPermissionDenied} className="flex-1 w-full h-full overflow-hidden" isVideoAvailable={true} isAudioAvailable={true} stream={myStream} audioDevices={audioDevices} videoDevices={videoDevices} selectedVideoDevice={selectedVideoDevice} selectedAudioDevice={selectedAudioDevice} setupVideoDevice={setupVideoDevice} setupAudioDevice={setupAudioDevice} onHandleStopClick={handleStopClick} handleSettingsSubmit={handleSettingsSubmit} />
								<RouletteGuestVideoContainer className="flex-1 w-full h-full overflow-hidden" isLoading={isSearching} isFound={isFound} stream={remoteStream} isVolumeSliderAvailable onHandleStartClick={handleStartClick} onHandlePauseClick={handlePauseClick} onHandleStopClick={handleStopClick} onHandleSkipClick={handleSkipClick} />
							</div>
						</div>
						<div className="flex-0">
							<RuleWarningMessage />
						</div>
					</div>
				</CardContent>
			</Card>
		</>
	);
}

export default RouletteCard;
