import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

import type { JoinRoomSchemaType, RoomType } from "@/lib/types/room";

import { AlertDialogComponent } from "@/components/compound/alert-dialog";
import GuestVideoContainer from "@/components/compound/guest-video-container";
import OwnerVideoContainer from "@/components/compound/room-own-video-container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup
} from "@/components/ui/resizable";
import { useMediaDevice } from "@/hooks/use-media-device";
import { useWebRTC } from "@/hooks/use-webrtc";
import { useCheckIsCreator, useDeleteRoom, useGetRoom } from "@/queries/room";
import useMediaDeviceStore from "@/store/media-device-store";

export const Route = createFileRoute("/room/$id")({
	component: Room
});

function Room() {
	const navigate = useNavigate();
	const { id } = useParams({ from: "/room/$id" });
	const { state: mediaDeviceStoreState } = useMediaDeviceStore();
	const { data: isCreator, isPending: isPendingCheckIsCreator, isError: isErrorCheckIsCreator } = useCheckIsCreator({ id });
	const { data: room, isPending: isPendingGetRoom, isError: isErrorGetRoom } = useGetRoom({ id });
	const { mutate: deleteRoom } = useDeleteRoom({
		options: {
			onSuccess: () => {
				navigate({ to: "/" });
			},
			onError: () => {}
		}
	});
	const { setupCombinedDevice, combinedStream, selectedAudioDevice, selectedVideoDevice } = useMediaDevice({ isAudioAvailable: room?.isMicRequired, isVideoAvailable: room?.isCameraRequired, videoDeviceId: mediaDeviceStoreState.video || "", audioDeviceId: mediaDeviceStoreState.audio || "" });
	const { remoteStream, remoteAudioRef, isExpired, isHasGuest } = useWebRTC({ roomId: id, localStream: combinedStream });
	const [isOpen, setIsOpen] = useState(isExpired);

	useEffect(() => {
		(async () => {
			if (room) {
				await setupCombinedDevice();
			}
		})();
	}, [room]);

	const handleRoomExpiredAdoption = () => {
		navigate({ to: "/" });
	};

	const handleKickClick = () => {
	};

	const handleDelete = async (room: RoomType) => {
		const { id } = room;

		await deleteRoom({ id });
	};

	if (isErrorGetRoom || isErrorCheckIsCreator) {
		return (
			<div className="flex items-center justify-center h-full w-full text-red-500"></div>
		);
	}

	if (isPendingCheckIsCreator || isPendingGetRoom || !room) {
		return (
			<div className="w-full h-full flex items-center justify-center">
				<Loader className="w-6 h-6 text-white animate-spin" />
			</div>
		);
	}

	const handleSettingsSubmit = async (data: JoinRoomSchemaType) => {
		const { audioDeviceId, videoDeviceId } = data;

		if (selectedAudioDevice?.deviceId !== audioDeviceId || selectedVideoDevice?.deviceId !== videoDeviceId) {
			await setupCombinedDevice();
		}
	};

	return (
		<>
			<audio ref={remoteAudioRef} autoPlay style={{ display: "none" }} />

			<div className="w-full h-full">
				<ResizablePanelGroup
					direction="vertical"
					className="w-full h-full rounded-lg border"
				>
					{room && (
						<>
							<ResizablePanel defaultSize={70} className="p-4">
								<ResizablePanelGroup direction="horizontal" className="h-full">
									<ResizablePanel defaultSize={50} minSize={15}>
										<div className="relative h-full w-full">
											{isCreator
												? <OwnerVideoContainer room={room} stream={combinedStream} isCreator handleSettingsSubmit={handleSettingsSubmit} handleDelete={handleDelete} className="w-full h-full max-w-max max-h-max absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] aspect-square" />
												: <GuestVideoContainer room={room} stream={combinedStream} className="w-full h-full max-w-max max-h-max absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] aspect-square" />}
										</div>
									</ResizablePanel>
									<ResizableHandle className="mx-4" />
									<ResizablePanel defaultSize={50} minSize={15}>
										<div className="relative h-full w-full">
											{isHasGuest
												? <GuestVideoContainer room={room} stream={remoteStream} isKickUserAvailable={isCreator} isVolumeSliderAvailable handleKickClick={handleKickClick} className="w-full h-full max-w-max max-h-max absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] aspect-square" />
												: <div className="w-full h-full bg-gray-400"></div>	}
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
						</>
					)}
				</ResizablePanelGroup>
			</div>
			<AlertDialogComponent
				isOpen={isOpen}
				onOpenChange={setIsOpen}
				title="Room is unavailable"
				actionText="Ok"
				onAction={handleRoomExpiredAdoption}
			/>
		</>
	);
}
export default Room;
