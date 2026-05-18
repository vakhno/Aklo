import { z } from "zod";

// LanguageInputSchema - data received directly from the frontend
export const LanguageInputSchema = z.object({
	name: z.string({ error: (issue) => issue.input === undefined ? "Name is required" : "Name is invalid" })
		.min(2, "Name is too short")
		.max(50, "Name is too long"),
	nativeName: z.string({ error: (issue) => issue.input === undefined ? "Native name is required" : "Native name is invalid" })
		.min(2, "Native name is too short")
		.max(50, "Native name is too long"),
	code: z.string({ error: (issue) => issue.input === undefined ? "Code is required" : "Code is invalid" })
		.min(2, "Code is too short")
		.max(10, "Code is too long"),
	locale: z.string({ error: (issue) => issue.input === undefined ? "Locale name is required" : "Locale is invalid" })
		.min(2, "Locale is too short")
		.max(10, "Locale is too long"),
});

// LanguageReadySchema - data that is ready to be saved to the DB
export const LanguageReadySchema = LanguageInputSchema;

export type LanguageInputSchemaType = z.infer<typeof LanguageInputSchema>;
export type LanguageReadySchemaType = z.infer<typeof LanguageReadySchema>;
