import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

import GuestVideoContainer from "@/components/compound/guest-video-container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup
} from "@/components/ui/resizable";
import Video from "@/components/ui/video";
import { useMediaDevice } from "@/hooks/use-media-device";
import useMediaDeviceStore from "@/store/media-device-store";

export const Route = createFileRoute("/room/$id")({
	component: Room
});

function Room() {
	const { state: mediaDeviceStoreState } = useMediaDeviceStore();
	const { videoStream, setupDeviceStreams } = useMediaDevice({ isAudioAvailable: true, isVideoAvailable: true, videoDeviceId: mediaDeviceStoreState.video || "", audioDeviceId: mediaDeviceStoreState.audio || "" });

	useEffect(() => {
		(async () => {
			await setupDeviceStreams();
		})();
	}, []);

	return (
		<>
			<div className="w-full h-full">
				<ResizablePanelGroup
					direction="vertical"
					className="w-full h-full rounded-lg border"
				>
					<ResizablePanel defaultSize={70} className="p-4">
						<ResizablePanelGroup direction="horizontal" className="h-full">
							<ResizablePanel defaultSize={50} minSize={15}>
								<div className="relative h-full w-full">
									<Video className="w-full h-full max-w-max max-h-max absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] aspect-square" stream={videoStream} />
								</div>
							</ResizablePanel>
							<ResizableHandle className="mx-4" />
							<ResizablePanel defaultSize={50} minSize={15}>
								<div className="relative h-full w-full">
									<GuestVideoContainer className="w-full h-full max-w-max max-h-max absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] aspect-square" stream={videoStream} />
								</div>
							</ResizablePanel>
						</ResizablePanelGroup>
					</ResizablePanel>
					<ResizableHandle />
					<ResizablePanel defaultSize={30} maxSize={50} minSize={20} className="flex flex-col">
						<div className="flex h-full w-full items-center justify-center p-4">
							<Card className="h-full w-full">
								<CardContent className="p-4 flex flex-col h-full w-full">
									<div className="flex-1 overflow-y-auto mb-4 space-y-2">

									</div>
									<div className="flex gap-2">
										<Input
											placeholder="Type a message..."
											className="w-full"
										/>
										<Button>Send</Button>
									</div>
								</CardContent>
							</Card>
						</div>
					</ResizablePanel>
				</ResizablePanelGroup>
			</div>
		</>
	);
}

export default Room;
