import { z } from "zod";

export const FilterRoomSchema = z.object({
	language: z.string().optional()
});
