import { z } from "zod";

export const FilterRoomSchema = z.object({
	language: z.string().optional(),
});

export type FilterRoomSchemaType = z.infer<typeof FilterRoomSchema>;
