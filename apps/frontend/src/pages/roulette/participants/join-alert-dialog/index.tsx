import type { RouletteDocLeanPopulatedType } from "@shared/mongo/types/roulette";
import type { JoinRoomSchemaType, SettingsRoomSchemaType } from "@shared/schemas";

import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from "@shared/design-system/alert-dialog";
import { Button } from "@shared/design-system/button";
import { ScrollArea } from "@shared/design-system/scroll-area";
import { Link } from "@tanstack/react-router";
import { useId } from "react";

import JoinRoomForm from "@/components/forms/join-room-form";
import { useMediaDevice } from "@/hooks/use-media-device";
import useMediaDeviceStore from "@/store/media-device-store";

interface JoinDialogProps {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	onHandleSubmitClick: (value: JoinRoomSchemaType) => void;
	roulette: RouletteDocLeanPopulatedType;
	selectedAudioDeviceId?: string | null;
	selectedVideoDeviceId?: string | null;
}

const JoinAlertDialog = ({ isOpen, setIsOpen, roulette, onHandleSubmitClick }: JoinDialogProps) => {
	const joinFormId = useId();
	const { addDevice, state: mediaDeviceStoreState } = useMediaDeviceStore();
	const { videoDevices, audioDevices, videoStream, audioStream, selectedVideoDevice, selectedAudioDevice, setupVideoDevice, setupAudioDevice } = useMediaDevice({ isAudioAvailable: roulette?.isMicRequired, isVideoAvailable: roulette?.isCameraRequired, videoDeviceId: mediaDeviceStoreState.video || "", audioDeviceId: mediaDeviceStoreState.audio || "" });
	const { isMicRequired, isCameraRequired } = roulette;

	const onHandleFormChange = async (data: SettingsRoomSchemaType) => {
		const { videoDeviceId, audioDeviceId } = data;

		if (videoDeviceId !== selectedVideoDevice?.deviceId) {
			await setupVideoDevice(videoDeviceId);
			addDevice({ type: "video", value: videoDeviceId });
		}

		if (audioDeviceId !== selectedAudioDevice?.deviceId) {
			await setupAudioDevice(audioDeviceId);
			addDevice({ type: "audio", value: audioDeviceId });
		}
	};

	const handleSubmitClick = (data: JoinRoomSchemaType) => {
		onHandleSubmitClick?.(data);
	};

	return (
		<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Join roulette</AlertDialogTitle>
					<AlertDialogDescription>Select media devices to join the roulette</AlertDialogDescription>
				</AlertDialogHeader>
				<div className="overflow-hidden">
					<ScrollArea className="h-full">
						<JoinRoomForm formId={joinFormId} onHandleFormChange={onHandleFormChange} onHandleSubmit={handleSubmitClick} isCameraAvailable={isCameraRequired} isMicAvailable={isMicRequired} audioDevices={audioDevices} videoDevices={videoDevices} videoStream={videoStream} audioStream={audioStream} selectedVideoDevice={selectedVideoDevice} selectedAudioDevice={selectedAudioDevice} />
					</ScrollArea>
				</div>
				<AlertDialogFooter>
					<Button variant="outline" asChild>
						<Link to="/rooms" hash="roulettes">
							Cancel
						</Link>
					</Button>
					<Button form={joinFormId} type="submit">Join</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default JoinAlertDialog;
