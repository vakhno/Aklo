import type z from "zod";

import type SettingsSchema from "@/lib/zod-schemas/settings.schema";

export type SettingsSchemaType = z.infer<typeof SettingsSchema>;
