export interface CreatedRouletteType {
	id: string;
	language: string;
	isCameraRequired: boolean;
	isMicRequired: boolean;
	currentUserCount: number;
	availableUsers: string[];
}

export type HsetCreatedRouletteType = Record<keyof CreatedRouletteType, string>;
