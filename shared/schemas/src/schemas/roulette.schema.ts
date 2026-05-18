import { z } from "zod";

/** MongoDB ObjectId as a 24-character hex string (language ref). */
const mongoObjectIdStringSchema = z.string().refine(
	(id) => /^[a-f\d]{24}$/i.test(id),
	{ message: "Language is invalid" },
);

// RouletteInputSchema - data received directly from the frontend
export const RouletteInputSchema = z.object({
	language: z.string({ error: (issue) => issue.input === undefined ? "Language is required" : "Language is invalid" }),
	isCameraRequired: z.boolean({ error: (issue) => issue.input === undefined ? "IsCameraRequired is required" : "IsCameraRequired is invalid" }),
	isMicRequired: z.boolean({ error: (issue) => issue.input === undefined ? "IsMicRequired is required" : "IsMicRequired is invalid" }),
});

// RouletteReadySchema - data validated before persisting (language remains string; service casts to ObjectId)
export const RouletteReadySchema = z.object({
	language: mongoObjectIdStringSchema,
	isCameraRequired: z.boolean({ error: (issue) => issue.input === undefined ? "IsCameraRequired is required" : "IsCameraRequired is invalid" }),
	isMicRequired: z.boolean({ error: (issue) => issue.input === undefined ? "IsMicRequired is required" : "IsMicRequired is invalid" }),
	priority: z.number({ error: (issue) => issue.input === undefined ? "Priority is required" : "Priority is invalid" })
		.min(1, "Priority is too low")
		.refine(value => Number.isInteger(value), {
			message: "Priority must be an integer",
		}),
	activeUsersCount: z.number({ error: (issue) => issue.input === undefined ? "Active users count is required" : "Active users count is invalid" })
		.min(0, "Max guest count is too low")
		.refine(value => Number.isInteger(value), {
			message: "Active users count must be an integer",
		}),
});

export type RouletteInputSchemaType = z.infer<typeof RouletteInputSchema>;
export type RouletteReadySchemaType = z.infer<typeof RouletteReadySchema>;
