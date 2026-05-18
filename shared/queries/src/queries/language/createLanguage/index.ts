import { useMutation, type UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import type {  LanguageDocType, LanguageInputSchemaType } from "@shared/mongo/types/language";

type createLanguageProps = {
	apiBaseUrl: string;
	data: LanguageInputSchemaType;
};

const createLanguage = async ({ apiBaseUrl, data }: createLanguageProps): Promise<LanguageDocType> => {
	const response = await fetch(`${apiBaseUrl}/api/language`, {
		method: "POST",
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

type useCreateLanguageProps = {
	options?: UseMutationOptions<LanguageDocType, Error, createLanguageProps>;
};

export const useCreateLanguage = ({ options }: useCreateLanguageProps = {}) => {
	const queryClient = useQueryClient();
	const { onSuccess, ...restOptions } = options ?? {};

	return useMutation({
		mutationFn: createLanguage,
		...restOptions,
		onSuccess: (...args) => {
			queryClient.invalidateQueries({ queryKey: ["language-list"] });
			onSuccess?.(...args);
		}
	});
};
