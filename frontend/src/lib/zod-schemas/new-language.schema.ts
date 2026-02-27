import { z } from "zod";

export const NewLanguageSchema = z.object({
	name: z.string().min(2, "Name is too short").max(30, "Name is too long"),
	nativeName: z.string().min(2, "Native name is too short").max(30, "Native name is too long"),
	code: z.string().length(2, "Code must be 2 characters"),
	locale: z.string().length(5, "Locale must be 5 characters")
});
