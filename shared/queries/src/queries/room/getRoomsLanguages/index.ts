import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { LanguageDocLeanType } from "@shared/mongo/types/language";

type getRoomsLanguagesProps = {
	apiBaseUrl: string;
};

const getRoomsLanguages = async ({
	apiBaseUrl
}: getRoomsLanguagesProps): Promise<LanguageDocLeanType[]> => {
	const response = await fetch(`${apiBaseUrl}/api/room/language`, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json"
		}
	});

	if (!response.ok) {
		throw new Error("Failed to load list of used room languages!");
	}

	return response.json();
};

type useGetRoomsLanguagesProps = getRoomsLanguagesProps & {
	options?: Omit<UseQueryOptions<LanguageDocLeanType[], Error>, "queryKey" | "queryFn">;
};

export const useGetRoomsLanguages = ({
	apiBaseUrl,
	options
}: useGetRoomsLanguagesProps) => {
	return useQuery({
		queryKey: ["room-languages", apiBaseUrl],
		queryFn: () => getRoomsLanguages({ apiBaseUrl }),
		...options
	});
};
