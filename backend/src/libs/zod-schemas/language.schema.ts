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
	locale: z.string({ required_error: "Locale name is required", invalid_type_error: "Locale is invalid" })
		.min(2, "Locale is too short")
		.max(10, "Locale is too long"),
});
// LanguageReadySchema - data that is ready to be saved to the DB
export const LanguageReadySchema = LanguageInputSchema;
