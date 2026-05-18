import { z } from "zod";

export const FilterRouletteSchema = z.object({
	language: z.string().optional(),
});

export type FilterRouletteSchemaType = z.infer<typeof FilterRouletteSchema>;
