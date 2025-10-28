import { z } from "zod";

export const FilterRouletteSchema = z.object({
	language: z.string().optional()
});
