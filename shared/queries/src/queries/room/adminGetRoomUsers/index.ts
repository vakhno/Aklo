import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

type adminRoomPathFetchProps = {
	apiBaseUrl: string;
	path: string;
	init?: RequestInit;
};

const adminRoomPathFetch = async ({
	apiBaseUrl,
	path,
	init
}: adminRoomPathFetchProps) => {
	const response = await fetch(`${apiBaseUrl}/api/room${path}`, {
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

type getAdminRoomUsersProps = {
	apiBaseUrl: string;
	id: string;
};

const getAdminRoomUsers = async ({ apiBaseUrl, id }: getAdminRoomUsersProps) =>
	adminRoomPathFetch({ apiBaseUrl, path: `/${id}/users` });

type useAdminGetRoomUsersProps = getAdminRoomUsersProps & {
	options?: Omit<UseQueryOptions<{ users: string[] }, Error>, "queryKey" | "queryFn">;
};

export const useAdminGetRoomUsers = ({
	id,
	apiBaseUrl,
	options
}: useAdminGetRoomUsersProps) => {
	return useQuery({
		queryKey: ["admin-room-users", apiBaseUrl, id],
		queryFn: () => getAdminRoomUsers({ apiBaseUrl, id }),
		...options
	});
};
