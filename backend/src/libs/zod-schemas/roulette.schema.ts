import { Types } from "mongoose";
import { z } from "zod";

// RouletteInputSchema - data received directly from the frontend
export const RouletteInputSchema = z.object({
	language: z.string({ required_error: "Language is required", invalid_type_error: "Language is invalid" }),
	isCameraRequired: z.boolean({ required_error: "IsCameraRequired is required", invalid_type_error: "IsCameraRequired is invalid" }),
	isMicRequired: z.boolean({ required_error: "IsMicRequired is required", invalid_type_error: "IsMicRequired is invalid" }),
});
// RouletteReadySchema - data that is ready to be saved to the DB
export const RouletteReadySchema = z.object({
	language: z.string({ required_error: "Language is required", invalid_type_error: "Language is invalid" })
		.refine(async (id) => {
			const isValid = Types.ObjectId.isValid(id);

			return isValid;
		}, {
			message: "Language is invalid",
		})
		.transform(id => new Types.ObjectId(id)),
	isCameraRequired: z.boolean({ required_error: "IsCameraRequired is required", invalid_type_error: "IsCameraRequired is invalid" }),
	isMicRequired: z.boolean({ required_error: "IsMicRequired is required", invalid_type_error: "IsMicRequired is invalid" }),
	priority: z.number({ required_error: "Active users count is required", invalid_type_error: "Active users count is invalid" })
		.min(1, "Priority is too low")
		.refine(value => Number.isInteger(value), {
			message: "Priority must be an integer",
		}),
	activeUsersCount: z.number({ required_error: "Active users count is required", invalid_type_error: "Active users count is invalid" })
		.min(0, "Max guest count is too low")
		.refine(value => Number.isInteger(value), {
			message: "Active users count must be an integer",
		}),
});
