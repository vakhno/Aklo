export interface CreatedRouletteType {
	id: string;
	language: string;
	isCameraRequired: boolean;
	isMicRequired: boolean;
	currentUserCount: number;
	availableUsers: string[];
}

export interface GetAllRoulettesPropsType {
	language: string;
	limit: number;
	page: number;
}

export type HsetCreatedRouletteType = Record<keyof CreatedRouletteType, string>;
