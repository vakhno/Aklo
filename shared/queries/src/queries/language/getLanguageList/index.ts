import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import type { LanguageDocType } from "@shared/mongo/types/language";

type getLanguageListProps = {
	apiBaseUrl: string;
};

const getLanguageList = async ({apiBaseUrl}: getLanguageListProps): Promise<LanguageDocType[]> => {
	const response = await fetch(`${apiBaseUrl}/api/language`, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json"
		}
	});

	if (!response.ok) {
		throw new Error("Failed to load language list!");
	}

	return response.json();
};

type useGetLanguageListProps = getLanguageListProps &{
	options?: Omit<UseQueryOptions<LanguageDocType[], Error>, "queryKey" | "queryFn">;
};

export const useGetLanguageList = ({ apiBaseUrl, options }: useGetLanguageListProps) => {
	return useQuery({
		queryKey: ["language-list", apiBaseUrl],
		queryFn: () => getLanguageList({ apiBaseUrl }),
		...options
	});
};
