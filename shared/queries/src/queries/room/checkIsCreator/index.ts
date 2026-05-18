import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

type checkIsCreatorProps = {
	apiBaseUrl: string;
	id: string;
};

const checkIsCreator = async ({ apiBaseUrl, id }: checkIsCreatorProps): Promise<boolean> => {
	const response = await fetch(`${apiBaseUrl}/api/room/${id}/is-creator`, {
		method: "GET",
		credentials: "include"
	});

	if (!response.ok) {
		throw new Error("Failed to check is creator!");
	}

	const { isCreator } = await response.json();

	return isCreator;
};

type useCheckIsCreatorProps = checkIsCreatorProps & {
	options?: Omit<UseQueryOptions<boolean, Error>, "queryKey" | "queryFn">;
};

export const useCheckIsCreator = ({ apiBaseUrl, id, options }: useCheckIsCreatorProps) => {
	return useQuery({
		queryKey: ["is-creator", apiBaseUrl, id],
		queryFn: () => checkIsCreator({ apiBaseUrl, id }),
		...options
	});
};
