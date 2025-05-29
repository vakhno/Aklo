import type { CategoryKey } from "./category";
import type { LanguageKey } from "./language";

export interface Room {
	id: string;
	title: string;
	category: CategoryKey;
	language: LanguageKey;
	maxGuestCount: number;
	currentGuestCount: number;
	isCameraRequired: boolean;
	isMicRequired: boolean;
	createdAt: Date;
}
