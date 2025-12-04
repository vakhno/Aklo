import { z } from "zod";

// LanguageInputSchema - data received directly from the frontend
export const LanguageInputSchema = z.object({
	name: z.string({ required_error: "Name is required", invalid_type_error: "Name is invalid" })
		.min(2, "Name is too short")
		.max(50, "Name is too long"),
	nativeName: z.string({ required_error: "Native name is required", invalid_type_error: "Native name is invalid" })
		.min(2, "Native name is too short")
		.max(50, "Native name is too long"),
	code: z.string({ required_error: "Code is required", invalid_type_error: "Code is invalid" })
		.min(2, "Code is too short")
		.max(10, "Code is too long"),
	family: z.string({ required_error: "Family group is required", invalid_type_error: "Family group is invalid" })
		.min(2, "Family group is too short")
		.max(50, "Family group is too long"),
	subfamily: z.string({ required_error: "Subfamily group is required", invalid_type_error: "Subfamily group is invalid" })
		.min(2, "Subfamily group is too short")
		.max(50, "Subfamily group is too long"),
	nativeSpeakers: z.number({ required_error: "Native speakers is required", invalid_type_error: "Native speakers is invalid" })
		.min(1, "Native speakers is too low")
		.refine(value => Number.isInteger(value), {
			message: "MNative speakers must be an integer",
		}),
	direction: z.string({ required_error: "Direction is required", invalid_type_error: "Direction is invalid" })
		.min(2, "Direction is too short")
		.max(5, "Direction is too long"),
	countries: z.array(z.string())
		.min(1, "Countries should contain at least one country"),
	locale: z.string({ required_error: "Locale name is required", invalid_type_error: "Locale is invalid" })
		.min(2, "Locale is too short")
		.max(10, "Locale is too long"),
});
// LanguageReadySchema - data that is ready to be saved to the DB
export const LanguageReadySchema = LanguageInputSchema;
