import { z } from "zod";

export const FilterRoomSchema = z.object({
	category: z.string().optional(),
	language: z.string().optional()
});
