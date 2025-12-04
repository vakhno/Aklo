import { z } from "zod";

export const NewRoomSchema = z.object({
	title: z.string().min(10, "Title is too short"),
	language: z.string().min(1, "Please select a language"),
	isCameraRequired: z.boolean(),
	isMicRequired: z.boolean(),
	maxUsersCount: z.number()
});
