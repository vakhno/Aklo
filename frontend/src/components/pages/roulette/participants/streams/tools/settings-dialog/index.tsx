import { useId } from "react";

import type { SettingsRoomSchemaType } from "@/lib/types/room";

import SettingsForm from "@/components/forms/settings-form";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMediaDevice } from "@/hooks/use-media-device";
import useMediaDeviceStore from "@/store/media-device-store";

interface SettingsDialogProps {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	onHandleSubmitClick: (value: SettingsRoomSchemaType) => void;
	isMicRequired?: boolean;
	isCameraRequired?: boolean;
	selectedAudioDeviceId?: string | null;
	selectedVideoDeviceId?: string | null;
}

const SettingsDialog = ({ isOpen, setIsOpen, onHandleSubmitClick, isMicRequired, isCameraRequired, selectedAudioDeviceId, selectedVideoDeviceId }: SettingsDialogProps) => {
	const settingsFormId = useId();
	const { addDevice } = useMediaDeviceStore();

	const { videoStream, audioStream, audioDevices, videoDevices, selectedAudioDevice, selectedVideoDevice, setupAudioDevice, setupVideoDevice } = useMediaDevice({ isAudioAvailable: isMicRequired, isVideoAvailable: isCameraRequired, videoDeviceId: selectedVideoDeviceId, audioDeviceId: selectedAudioDeviceId });

	const handleSubmitClick = (data: SettingsRoomSchemaType) => {
		onHandleSubmitClick?.(data);
	};

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

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Settings</DialogTitle>
					<DialogDescription>Change your settings</DialogDescription>
				</DialogHeader>
				<div className="overflow-hidden">
					<ScrollArea className="h-full">
						<SettingsForm formId={settingsFormId} onHandleFormChange={onHandleFormChange} onHandleSubmit={handleSubmitClick} isCameraAvailable={isCameraRequired} isMicAvailable={isMicRequired} audioDevices={audioDevices} videoDevices={videoDevices} videoStream={videoStream} audioStream={audioStream} selectedVideoDevice={selectedVideoDevice} selectedAudioDevice={selectedAudioDevice} />
					</ScrollArea>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button type="submit" form={settingsFormId}>Save changes</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default SettingsDialog;
