import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

type getIsAvailableToVisitProps = {
	apiBaseUrl: string;
	id: string;
};

const getIsAvailableToVisit = async ({
	apiBaseUrl,
	id
}: getIsAvailableToVisitProps): Promise<boolean> => {
	const response = await fetch(`${apiBaseUrl}/api/room/${id}/is-available-to-visit`, {
		method: "GET",
		credentials: "include"
	});

	if (!response.ok) {
		throw new Error("Room is unavailable to visit!");
	}

	return true;
};

type useIsAvailableToVisitProps = getIsAvailableToVisitProps & {
	options?: Omit<UseQueryOptions<boolean, Error>, "queryKey" | "queryFn">;
};

export const useIsAvailableToVisit = ({
	apiBaseUrl,
	id,
	options
}: useIsAvailableToVisitProps) => {
	return useQuery({
		queryKey: ["is-available-to-visit", apiBaseUrl, id],
		queryFn: () => getIsAvailableToVisit({ apiBaseUrl, id }),
		...options
	});
};
