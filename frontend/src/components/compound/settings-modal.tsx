import { useEffect, useId } from "react";

import type { JoinRoomSchemaType } from "@/lib/types/room";

import SettingsForm from "@/components/compound/settings-form";
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
import { useMediaDevice } from "@/hooks/use-media-device";
import useMediaDeviceStore from "@/store/media-device-store";

interface SettingsModalProps {
	isOpen: boolean;
	setOpen: (value: boolean) => void;
	submitAction?: (data: JoinRoomSchemaType) => void;
	isCameraAvailable: boolean;
	isMicAvailable: boolean;
}

const SettingsModal = ({ isOpen, setOpen, submitAction, isCameraAvailable, isMicAvailable }: SettingsModalProps) => {
	const formId = useId();
	const { addDevice, state: mediaDeviceStoreState } = useMediaDeviceStore();
	const { videoDevices, audioDevices, videoStream, audioStream, selectedVideoDevice, selectedAudioDevice, setupCombinedDevice, setupVideoDevice, setupAudioDevice } = useMediaDevice({ isAudioAvailable: isMicAvailable, isVideoAvailable: isCameraAvailable, videoDeviceId: mediaDeviceStoreState.video || "", audioDeviceId: mediaDeviceStoreState.audio || "" });

	const onHandleSubmit = (data: JoinRoomSchemaType) => {
		submitAction && submitAction(data);

		setOpen(false);
	};

	const onHandleFormChange = async (data: JoinRoomSchemaType) => {
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

	useEffect(() => {
		(async () => {
			await setupCombinedDevice();
		})();
	}, []);

	return (
		<Dialog open={isOpen} onOpenChange={setOpen}>
			<DialogContent className="max-w-sm">
				<DialogHeader>
					<DialogTitle>Settings</DialogTitle>
					<DialogDescription>
						Change your settings.
					</DialogDescription>
				</DialogHeader>

				<div className="flex flex-col gap-4 py-4 h-full overflow-auto">
					<SettingsForm formId={formId} onHandleFormChange={onHandleFormChange} onHandleSubmit={onHandleSubmit} isCameraAvailable={isCameraAvailable} isMicAvailable={isMicAvailable} audioDevices={audioDevices} videoDevices={videoDevices} videoStream={videoStream} audioStream={audioStream} selectedVideoDevice={selectedVideoDevice} selectedAudioDevice={selectedAudioDevice} />
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button type="submit" form={formId}>Ok</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default SettingsModal;
