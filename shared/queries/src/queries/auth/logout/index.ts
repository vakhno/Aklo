import { getAuthClient, logout } from "@shared/auth/client";
import {
	type QueryClient,
	useMutation,
	type UseMutationOptions,
	useQueryClient

} from "@tanstack/react-query";

const logoutMutationFn = async () => {
	const client = getAuthClient();

	await logout({ client });
};
const logoutOnSuccess = (queryClient: QueryClient) => {
	queryClient.setQueryData(["session"], null);
};

type UseLogoutProps = {
	options?: UseMutationOptions<void, Error, void>;
};

export function useLogout({ options }: UseLogoutProps = {}) {
	const queryClient = useQueryClient();
	const { onSuccess, ...restOptions } = options ?? {};

	return useMutation({
		mutationFn: logoutMutationFn,
		onSuccess: (...args) => {
			logoutOnSuccess(queryClient);
			onSuccess?.(...args);
		},
		...restOptions
	});
}
