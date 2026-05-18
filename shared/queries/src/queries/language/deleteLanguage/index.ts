import { useMutation, type UseMutationOptions, useQueryClient } from "@tanstack/react-query";

type deleteLanguageProps = {
	id: string;
	apiBaseUrl: string;
};

const deleteLanguage = async ({ id, apiBaseUrl }: deleteLanguageProps): Promise<boolean> => {
	const response = await fetch(`${apiBaseUrl}/api/language/${id}`, {
		method: "DELETE",
		credentials: "include"
	});

	if (!response.ok) {
		const error = await response.json().catch(() => ({ error: "Request failed" }));
		throw new Error(error.error || "Request failed");
	}

	return true;
};

type useDeleteLanguageProps = {
	options?: UseMutationOptions<boolean, Error, deleteLanguageProps>;
};

export const useDeleteLanguage = ({ options }: useDeleteLanguageProps = {}) => {
	const queryClient = useQueryClient();
	const { onSuccess, ...restOptions } = options ?? {};

	return useMutation({
		mutationFn: deleteLanguage,
		...restOptions,
		onSuccess: (...args) => {
			queryClient.invalidateQueries({ queryKey: ["language-list"] });
			onSuccess?.(...args);
		}
	});
};
