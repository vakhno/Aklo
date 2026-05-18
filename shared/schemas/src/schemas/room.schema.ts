import { z } from "zod";

/** MongoDB ObjectId as a 24-character hex string (language ref). */
const mongoObjectIdStringSchema = z.string().refine(
	(id) => /^[a-f\d]{24}$/i.test(id),
	{ message: "Language is invalid" },
);

// RoomInputSchema - data received directly from the front to back for room creation
export const RoomInputSchema = z.object({
	title: z.string({ error: (issue) => issue.input === undefined ? "Title is required" : "Title is invalid" })
		.min(10, "Title is too short")
		.max(50, "Title is too long"),
	language: z.string({ error: (issue) => issue.input === undefined ? "Language is required" : "Language is invalid" }),
	isCameraRequired: z.boolean({ error: (issue) => issue.input === undefined ? "Camera is required" : "Camera is invalid" }),
	isMicRequired: z.boolean({ error: (issue) => issue.input === undefined ? "Mic is required" : "Mic is invalid" }),
	maxUsersCount: z.number({ error: (issue) => issue.input === undefined ? "Max guest count is required" : "Max guest count is invalid" })
		.min(1, "Max guest count is too low")
		.refine(value => Number.isInteger(value), {
			message: "Max guest count must be an integer",
		}),
});

// RoomReadySchema - data validated before persisting (language remains string; backend casts to ObjectId)
export const RoomReadySchema = z.object({
	title: z.string({ error: (issue) => issue.input === undefined ? "Title is required" : "Title is invalid" }).min(10, "Title is too short").max(50, "Title is too long"),
	language: mongoObjectIdStringSchema,
	creatorId: z.string({ error: (issue) => issue.input === undefined ? "Creator id is required" : "Creator id is invalid" }),
	isCameraRequired: z.boolean({ error: (issue) => issue.input === undefined ? "Camera is required" : "Camera is invalid" }),
	isMicRequired: z.boolean({ error: (issue) => issue.input === undefined ? "Mic is required" : "Mic is invalid" }),
	activeUsersCount: z.number({ error: (issue) => issue.input === undefined ? "Active users count is required" : "Active users count is invalid" })
		.min(0, "Active users count is too low")
		.refine(value => Number.isInteger(value), {
			message: "Active users count must be an integer",
		}),
	maxUsersCount: z.number({ error: (issue) => issue.input === undefined ? "Max users count is required" : "Max users count is invalid" })
		.min(1, "Max users count is too low")
		.refine(value => Number.isInteger(value), {
			message: "Max users count must be an integer",
		}),
});

export type RoomInputSchemaType = z.infer<typeof RoomInputSchema>;
export type RoomReadySchemaType = z.infer<typeof RoomReadySchema>;
