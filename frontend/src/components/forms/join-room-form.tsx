import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

import type { JoinRoomSchemaType } from "@/lib/types/room";

import {
	Form,
	FormControl,
	FormDescription,
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
import Video from "@/components/ui/video";
import { cn } from "@/lib/utils/cn";
import JoinRoomSchema from "@/lib/zod-schemas/join-room.schema";

import { LiveWaveform } from "../ui/live-waveform";
import { Switch } from "../ui/switch";

interface JoinRoomFormProps {
	className?: string;
	formId: string;
	videoStream: MediaStream | null;
	audioStream: MediaStream | null;
	selectedVideoDevice: MediaDeviceInfo | null;
	selectedAudioDevice: MediaDeviceInfo | null;
	audioDevices: MediaDeviceInfo[];
	videoDevices: MediaDeviceInfo[];
	isCameraAvailable: boolean;
	isMicAvailable: boolean;
	onHandleFormChange: (data: JoinRoomSchemaType) => void;
	onHandleSubmit: (data: JoinRoomSchemaType) => void;
}

const JoinRoomForm = ({ className, formId, videoStream, audioStream, selectedVideoDevice, selectedAudioDevice, audioDevices, videoDevices, isCameraAvailable, isMicAvailable, onHandleFormChange, onHandleSubmit }: JoinRoomFormProps) => {
	const form = useForm<JoinRoomSchemaType>({
		resolver: zodResolver(JoinRoomSchema),
		defaultValues: {
			videoDeviceId: selectedVideoDevice?.deviceId || "",
			audioDeviceId: selectedAudioDevice?.deviceId || "",
			isVideoDeviceRequired: isCameraAvailable,
			isAudioDeviceRequired: isMicAvailable,
			acceptRules: false
		}
	});

	const { handleSubmit, getValues, setValue } = form;

	const watch = useWatch({ control: form.control }) as JoinRoomSchemaType;

	useEffect(() => {
		if (getValues("videoDeviceId") !== watch.videoDeviceId) {
			setValue("videoDeviceId", selectedVideoDevice?.deviceId || "");
		}

		if (getValues("audioDeviceId") !== watch.audioDeviceId) {
			setValue("audioDeviceId", selectedAudioDevice?.deviceId || "");
		}
		onHandleFormChange(watch);
	}, [watch]);

	useEffect(() => {
		setValue("videoDeviceId", selectedVideoDevice?.deviceId || "");
	}, [selectedVideoDevice]);

	useEffect(() => {
		setValue("audioDeviceId", selectedAudioDevice?.deviceId || "");
	}, [selectedAudioDevice]);

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onHandleSubmit)} id={formId} className={cn("flex flex-col gap-4", className)}>
				<FormField
					control={form.control}
					name="acceptRules"
					render={({ field }) => (
						<FormItem className="flex items-center justify-between rounded-lg border p-3">
							<div className="flex flex-col">
								<FormLabel>Accept agreements</FormLabel>
								<FormDescription>
									I agree to rules, terms of use and privacy policy.
								</FormDescription>
							</div>
							<FormControl>
								<Switch
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				{(isMicAvailable)
					&& (
						<div className="flex flex-col gap-2">
							<FormField
								control={form.control}
								name="audioDeviceId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Audio device</FormLabel>
										<Select
											onValueChange={async (val) => {
												field.onChange(val);
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
							<LiveWaveform
								stream={audioStream}
								active={true}
								processing={true}
								height={80}
								barWidth={3}
								barGap={2}
								mode="static"
								fadeEdges={true}
								barColor="gray"
								historySize={120}
							/>
						</div>
					)}
				{(isCameraAvailable)
					&& (
						<div className="flex flex-col gap-2">
							<FormField
								control={form.control}
								name="videoDeviceId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Camera device</FormLabel>
										<Select
											onValueChange={async (val) => {
												field.onChange(val);
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
							<Video className="aspect-square" stream={videoStream} />
						</div>
					)}
			</form>
		</Form>
	);
};

export default JoinRoomForm;
