import { createFileRoute, useParams } from "@tanstack/react-router";
import { useEffect } from "react";

import type { JoinRoomSchemaType } from "@/lib/types/room";

import RouletteGuestVideoContainer from "@/components/compound/roulette-guest-video-container";
import RouletteOwnVideoContainer from "@/components/compound/roulette-own-video-container";
import RuleWarningMessage from "@/components/compound/rule-warning-message";
import TextChat from "@/components/compound/text-chat";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup
} from "@/components/ui/resizable";
import { useMediaDevice } from "@/hooks/use-media-device";
import { useRouletteWebRTC } from "@/hooks/use-roulette-webrtc";
import useMediaDeviceStore from "@/store/media-device-store";

export const Route = createFileRoute("/roulette/$id")({
	component: Roulette
});

function Roulette() {
	const { id } = useParams({ from: "/roulette/$id" });
	const { state: mediaDeviceStoreState } = useMediaDeviceStore();
	const { setupCombinedDevice, setupVideoDevice, setupAudioDevice, combinedStream, audioDevices, videoDevices, selectedVideoDevice, selectedAudioDevice, isPermissionDenied } = useMediaDevice({ isAudioAvailable: true, isVideoAvailable: true, videoDeviceId: mediaDeviceStoreState.video || "", audioDeviceId: mediaDeviceStoreState.audio || "" });
	const { myStream, remoteStream, isSearching, isFound, initSocket, startSearch, pauseSearch, stopSearch, skipOpponent } = useRouletteWebRTC(combinedStream, id);

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

	useEffect(() => {
		const handleBeforeUnload = () => {};

		window.addEventListener("beforeunload", handleBeforeUnload);

		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, []);

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
		<div className="w-full h-full">
			<ResizablePanelGroup
				direction="vertical"
				className="w-full h-full rounded-lg border"
			>
				<ResizablePanel defaultSize={70} className="p-4">
					<ResizablePanelGroup direction="horizontal" className="h-full">
						<ResizablePanel defaultSize={50} minSize={15}>
							<div className="relative h-full w-full">
								<RouletteOwnVideoContainer isStreamValid={!isPermissionDenied} className="w-full h-full max-w-max max-h-max absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] aspect-square" isVideoAvailable={true} isAudioAvailable={true} stream={myStream} audioDevices={audioDevices} videoDevices={videoDevices} selectedVideoDevice={selectedVideoDevice} selectedAudioDevice={selectedAudioDevice} setupVideoDevice={setupVideoDevice} setupAudioDevice={setupAudioDevice} onHandleStopClick={handleStopClick} handleSettingsSubmit={handleSettingsSubmit} />
							</div>
						</ResizablePanel>
						<ResizableHandle className="mx-4" />
						<ResizablePanel defaultSize={50} minSize={15}>
							<div className="relative h-full w-full">
								<RouletteGuestVideoContainer className="w-full h-full max-w-max max-h-max absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] aspect-square" isLoading={isSearching} isFound={isFound} stream={remoteStream} isVolumeSliderAvailable onHandleStartClick={handleStartClick} onHandlePauseClick={handlePauseClick} onHandleStopClick={handleStopClick} onHandleSkipClick={handleSkipClick} />
							</div>
						</ResizablePanel>
					</ResizablePanelGroup>
				</ResizablePanel>
				<ResizableHandle />
				<ResizablePanel defaultSize={60} maxSize={80} minSize={40} className="flex flex-col">
					<div className="flex flex-col h-full w-full items-center justify-center p-4">
						<RuleWarningMessage />
						<TextChat />
					</div>
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
}

export default Roulette;
