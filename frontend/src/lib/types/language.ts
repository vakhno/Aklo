import type { z } from "zod";

import type { NewLanguageSchema } from "@/lib/zod-schemas/new-language.schema";

export type LanguageType = {
	_id: string;
	name: string;
	nativeName: string;
	code: string;
	locale: string;
};

export type NewLanguageSchemaType = z.infer<typeof NewLanguageSchema>;
