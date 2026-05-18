import { useMutation, type UseMutationOptions, useQueryClient } from "@tanstack/react-query";

import type { LanguageDocType } from "@shared/mongo/types/language";

type updateLanguageProps = {
	apiBaseUrl: string;
	id: string;
	data: Partial<LanguageDocType>;
};

const updateLanguage = async ({ id, data, apiBaseUrl }: updateLanguageProps): Promise<LanguageDocType> => {
	const response = await fetch(`${apiBaseUrl}/api/language/${id}`, {
		method: "PUT",
		credentials: "include",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	});

	if (!response.ok) {
		const error = await response.json().catch(() => ({ error: "Request failed" }));
		throw new Error(error.error || "Request failed");
	}

	return response.json();
};

type useUpdateLanguageProps = {
	options?: UseMutationOptions<LanguageDocType, Error, updateLanguageProps>;
};

export const useUpdateLanguage = ({ options }: useUpdateLanguageProps = {}) => {
	const queryClient = useQueryClient();
	const { onSuccess, ...restOptions } = options ?? {};
	
	return useMutation({
		mutationFn: updateLanguage,
		...restOptions,
		onSuccess: (...args) => {
			queryClient.invalidateQueries({ queryKey: ["language-list"] });
			onSuccess?.(...args);
		}
	});
};
