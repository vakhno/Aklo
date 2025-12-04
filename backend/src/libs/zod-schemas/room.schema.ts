import { Types } from "mongoose";
import { z } from "zod";

// RoomInputSchema - data received directly from the frontend
export const RoomInputSchema = z.object({
	title: z.string({ required_error: "Title is required", invalid_type_error: "Title is invalid" })
		.min(10, "Title is too short")
		.max(50, "Title is too long"),
	language: z.string({ required_error: "Language is required", invalid_type_error: "Language is invalid" }),
	isCameraRequired: z.boolean({ required_error: "Camera is required", invalid_type_error: "Camera is invalid" }),
	isMicRequired: z.boolean({ required_error: "Mic is required", invalid_type_error: "Mic is invalid" }),
	maxUsersCount: z.number({ required_error: "Max guest count is required", invalid_type_error: "Max guest count is invalid" })
		.min(1, "Max guest count is too low")
		.refine(value => Number.isInteger(value), {
			message: "Max guest count must be an integer",
		}),
});
// RoomReadySchema - data that is ready to be saved to the DB
export const RoomReadySchema = z.object({
	title: z.string({ required_error: "Title is required", invalid_type_error: "Title is invalid" }).min(10, "Title is too short").max(50, "Title is too long"),
	language: z.string({ required_error: "Language is required", invalid_type_error: "Language is invalid" })
		.refine(async (id) => {
			const isValid = Types.ObjectId.isValid(id);

			return isValid;
		}, {
			message: "Language is invalid",
		})
		.transform(id => new Types.ObjectId(id)),
	creatorId: z.string({ required_error: "Creator id is required", invalid_type_error: "Creator id is invalid" })
		.uuid({ message: "CreatorId is invalid" }),
	isCameraRequired: z.boolean({ required_error: "Camera is required", invalid_type_error: "Camera is invalid" }),
	isMicRequired: z.boolean({ required_error: "Mic is required", invalid_type_error: "Mic is invalid" }),
	activeUsersCount: z.number({ required_error: "Active users count is required", invalid_type_error: "Active users count is invalid" })
		.min(0, "Active users count is too low")
		.refine(value => Number.isInteger(value), {
			message: "Active users count must be an integer",
		}),
	maxUsersCount: z.number({ required_error: "Max users count is required", invalid_type_error: "Max users count is invalid" })
		.min(1, "Max users count is too low")
		.refine(value => Number.isInteger(value), {
			message: "Max users count must be an integer",
		}),
});
