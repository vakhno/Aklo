import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

type adminRouletteFetchProps = {
	apiBaseUrl: string;
	path: string;
	init?: RequestInit;
};

const adminRouletteFetch = async ({
	apiBaseUrl,
	path,
	init
}: adminRouletteFetchProps) => {
	const response = await fetch(`${apiBaseUrl}/api/roulette${path}`, {
		...init,
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			...init?.headers
		}
	});

	if (!response.ok) {
		const error = await response.json().catch(() => ({ error: "Request failed" }));
		throw new Error(error.error || "Request failed");
	}

	if (response.status === 204) {
		return null;
	}

	return response.json();
};

type getAdminRouletteUsersProps = {
	apiBaseUrl: string;
	id: string;
};

const getAdminRouletteUsers = async ({
	apiBaseUrl,
	id
}: getAdminRouletteUsersProps) => adminRouletteFetch({ apiBaseUrl, path: `/${id}/users` });

type useAdminGetRouletteUsersProps = getAdminRouletteUsersProps & {
	options?: Omit<UseQueryOptions<{ users: string[] }, Error>, "queryKey" | "queryFn">;
};

export const useAdminGetRouletteUsers = ({
	id,
	apiBaseUrl,
	options
}: useAdminGetRouletteUsersProps) => {
	return useQuery({
		queryKey: ["admin-roulette-users", apiBaseUrl, id],
		queryFn: () => getAdminRouletteUsers({ apiBaseUrl, id }),
		...options
	});
};
