import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useId } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import {
	Form,
	FormField,
	FormItem,
	FormLabel
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select";
import { useMediaDevice } from "@/hooks/use-media-device";
import useMediaDeviceStore from "@/store/media-device-store";

import AudioVisualizer from "../ui/audio-visualizer";
import Video from "../ui/video";

interface CreateRoomModalProps {
	isOpen: boolean;
	setOpen: (value: boolean) => void;
	submitAction?: (data: JoinRoomSchemaType) => void;
	isCameraAvailable: boolean;
	isMicAvailable: boolean;
}

const JoinRoomSchema = z.object({
	videoDeviceId: z.string(),
	audioDeviceId: z.string(),
	isVideoDeviceRequired: z.boolean(),
	isAudioDeviceRequired: z.boolean()
}).refine((data) => {
	if (data.isVideoDeviceRequired && (!data.videoDeviceId || data.videoDeviceId.length === 0)) {
		return false;
	}
	return true;
}, {
	message: "Please select a camera",
	path: ["videoDeviceId"]
}).refine((data) => {
	if (data.isAudioDeviceRequired && (!data.audioDeviceId || data.audioDeviceId.length === 0)) {
		return false;
	}
	return true;
}, {
	message: "Please select a microphone",
	path: ["audioDeviceId"]
});

type JoinRoomSchemaType = z.infer<typeof JoinRoomSchema>;

const JoinRoomModal = ({ isOpen, setOpen, submitAction, isCameraAvailable, isMicAvailable }: CreateRoomModalProps) => {
	const joinRoomFormId = useId();
	const { addDevice, state: mediaDeviceStoreState } = useMediaDeviceStore();
	const { videoDevices, audioDevices, videoStream, audioStream, selectedVideoDevice, selectedAudioDevice, setupVideoDevice, setupAudioDevice } = useMediaDevice({ isAudioAvailable: isMicAvailable, isVideoAvailable: isCameraAvailable, videoDeviceId: mediaDeviceStoreState.video || "", audioDeviceId: mediaDeviceStoreState.audio || "" });
	const form = useForm<JoinRoomSchemaType>({
		resolver: zodResolver(JoinRoomSchema),
		defaultValues: {
			videoDeviceId: selectedVideoDevice?.deviceId || "",
			audioDeviceId: selectedAudioDevice?.deviceId || "",
			isVideoDeviceRequired: isCameraAvailable,
			isAudioDeviceRequired: isMicAvailable
		}
	});

	const {
		handleSubmit,
		setValue
	} = form;

	const onSubmit = async (data: JoinRoomSchemaType) => {
		submitAction && submitAction(data);

		setOpen(false);
	};

	useEffect(() => {
		(async () => {
			await setupVideoDevice(mediaDeviceStoreState.video || "");
			await setupAudioDevice(mediaDeviceStoreState.audio || "");
		})();
	}, []);

	useEffect(() => {
		setValue("videoDeviceId", selectedVideoDevice?.deviceId || "");
	}, [selectedVideoDevice]);

	useEffect(() => {
		setValue("audioDeviceId", selectedAudioDevice?.deviceId || "");
	}, [selectedAudioDevice]);

	return (
		<Dialog open={isOpen} onOpenChange={setOpen}>
			<DialogContent className="max-w-sm">
				<DialogHeader>
					<DialogTitle>Join Room</DialogTitle>
					<DialogDescription>
						Select your camera and microphone to join the room.
					</DialogDescription>
				</DialogHeader>

				<div className="flex flex-col gap-4 py-4 h-full overflow-auto">
					<Form {...form}>
						<form onSubmit={handleSubmit(onSubmit)} id={joinRoomFormId} className="flex flex-col gap-4">
							{isCameraAvailable
								&& (
									<FormField
										control={form.control}
										name="videoDeviceId"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Camera device</FormLabel>
												<Select
													onValueChange={async (val) => {
														field.onChange(val);
														addDevice({ type: "video", value: val });
														await setupVideoDevice(val);
													}}
													value={field.value}
												>
													<SelectTrigger className="w-full truncate">
														<SelectValue placeholder="Select video device" />
													</SelectTrigger>
													<SelectContent>
														{videoDevices.map(device => (
															<SelectItem className="truncate" key={device.deviceId} value={device.deviceId}>
																{device.label}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</FormItem>
										)}
									/>
								)}
							{isMicAvailable
								&& (
									<FormField
										control={form.control}
										name="audioDeviceId"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Audio device</FormLabel>
												<Select
													onValueChange={async (val) => {
														field.onChange(val);
														addDevice({ type: "audio", value: val });
														await setupAudioDevice(val);
													}}
													value={field.value}
												>
													<SelectTrigger className="w-full truncate">
														<SelectValue placeholder="Select audio device" />
													</SelectTrigger>
													<SelectContent>
														{audioDevices.map(device => (
															<SelectItem key={device.deviceId} value={device.deviceId}>
																{device.label}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</FormItem>
										)}
									/>
								)}
						</form>
					</Form>
					{isCameraAvailable
						&& <Video className="aspect-square" stream={videoStream} />}
					{ isMicAvailable
						&& <AudioVisualizer className="aspect-[12/4]" stream={audioStream} />}
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button type="submit" form={joinRoomFormId}>Join Room</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default JoinRoomModal;
