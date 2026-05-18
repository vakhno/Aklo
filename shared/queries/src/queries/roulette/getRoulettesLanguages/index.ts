import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import type { LanguageDocType } from "@shared/mongo/types/language";

type getRoulettesLanguagesProps = {
	apiBaseUrl: string;
};

const getRoulettesLanguages = async ({
	apiBaseUrl
}: getRoulettesLanguagesProps): Promise<LanguageDocType[]> => {
	const response = await fetch(`${apiBaseUrl}/api/roulette/language`, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json"
		}
	});

	if (!response.ok) {
		throw new Error("Failed to load list of used roulette languages!");
	}

	return response.json();
};

type useGetRoulettesLanguagesProps = getRoulettesLanguagesProps & {
	options?: Omit<UseQueryOptions<LanguageDocType[], Error>, "queryKey" | "queryFn">;
};

export const useGetRoulettesLanguages = ({
	apiBaseUrl,
	options
}: useGetRoulettesLanguagesProps) => {
	return useQuery({
		queryKey: ["roulette-languages", apiBaseUrl],
		queryFn: () => getRoulettesLanguages({ apiBaseUrl }),
		...options
	});
};
