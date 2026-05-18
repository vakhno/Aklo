import type { ClientSession } from "@shared/auth/types";

import { getAuthClient, getClientSession } from "@shared/auth/client";
import {
	useQuery,
	type UseQueryOptions
} from "@tanstack/react-query";

const getSessionQueryFn = async (): Promise<ClientSession | null> => {
	const client = getAuthClient();
	const session = await getClientSession({ client });

	return session;
};

type UseGetSessionProps = {
	options?: Omit<Partial<UseQueryOptions<ClientSession | null, Error>>, "queryKey" | "queryFn">;
};

const useGetSessionDefaultOptions: Partial<UseGetSessionProps["options"]> = {
	refetchIntervalInBackground: true,
	refetchOnWindowFocus: true,
	refetchInterval: 10 * 60 * 1000,
	staleTime: 10 * 60 * 1000
};

export function useGetSession({ options }: UseGetSessionProps = {}) {
	return useQuery<ClientSession | null, Error>({
		queryKey: ["session"],
		queryFn: getSessionQueryFn,
		...options,
		...useGetSessionDefaultOptions
	});
}
