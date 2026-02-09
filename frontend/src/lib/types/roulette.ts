import type { z } from "zod";

import type { LanguageType } from "@/lib/types/language";
import type { FilterRouletteSchema } from "@/lib/zod-schemas/filter-roulette.schema";
import type { JoinRouletteSchema } from "@/lib/zod-schemas/join-roulette.schems";

export type RouletteType = {
	_id: string;
	language: LanguageType;
	isCameraRequired: boolean;
	isMicRequired: boolean;
	priority: number;
	activeUsersCount: number;
};

export type JoinRouletteSchemaType = z.infer<typeof JoinRouletteSchema>;
export type FilterRouletteSchemaType = z.infer<typeof FilterRouletteSchema>;
