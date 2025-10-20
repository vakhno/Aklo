import { z } from "zod";

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

export default JoinRoomSchema;
