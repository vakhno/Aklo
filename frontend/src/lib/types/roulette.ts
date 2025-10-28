import type { z } from "zod";

import type { LanguageKeyType } from "@/lib/types/list.type";
import type { FilterRouletteSchema } from "@/lib/zod-schemas/filter-roulette.schema";
import type { JoinRouletteSchema } from "@/lib/zod-schemas/join-roulette.schems";

export type RouletteType = {
	id: string;
	language: LanguageKeyType;
	isCameraRequired: boolean;
	isMicRequired: boolean;
	currentUserCount: number;
};

export type JoinRouletteSchemaType = z.infer<typeof JoinRouletteSchema>;
export type FilterRouletteSchemaType = z.infer<typeof FilterRouletteSchema>;
