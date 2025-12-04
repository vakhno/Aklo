import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import type { LanguageType } from "@/lib/types/language";

const getLanguageList = async (): Promise<LanguageType[]> => {
	const url = `${import.meta.env.VITE_SOCKET_URL}/api/language`;
	const response = await fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});

	const { ok } = response;

	if (!ok) {
		throw new Error("Failed to load language list!");
	}

	const languageList = await response.json();

	return languageList;
};

type useGetLanguageListProps = {
	options?: UseQueryOptions<LanguageType[], Error>;
};

export const useGetLanguageList = ({ options }: useGetLanguageListProps) => {
	return useQuery({
		queryKey: ["language-list"],
		queryFn: () => getLanguageList(),
		...options
	});
};
