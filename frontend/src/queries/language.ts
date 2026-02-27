import { useMutation, type UseMutationOptions, useQuery, useQueryClient, type UseQueryOptions } from "@tanstack/react-query";

import type { LanguageType } from "@/lib/types/language";

const API_URL = `${import.meta.env.VITE_SOCKET_URL}/api/language`;

const getLanguageList = async (): Promise<LanguageType[]> => {
	const response = await fetch(API_URL, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json"
		}
	});

	if (!response.ok) {
		throw new Error("Failed to load language list!");
	}

	return response.json();
};

type useGetLanguageListProps = {
	options?: UseQueryOptions<LanguageType[], Error>;
};

export const useGetLanguageList = ({ options }: useGetLanguageListProps) => {
	return useQuery({
		queryKey: ["language-list"],
		queryFn: () => getLanguageList(),
		...options
	});
};

type createLanguageProps = {
	data: Omit<LanguageType, "_id">;
};

const createLanguage = async ({ data }: createLanguageProps): Promise<LanguageType> => {
	const response = await fetch(API_URL, {
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
	options?: UseMutationOptions<LanguageType, Error, createLanguageProps>;
};

export const useCreateLanguage = ({ options }: useCreateLanguageProps = {}) => {
	const queryClient = useQueryClient();
	const { onSuccess, ...restOptions } = options ?? {};

	return useMutation({
		mutationFn: createLanguage,
		onSuccess: (...args) => {
			queryClient.invalidateQueries({ queryKey: ["language-list"] });
			onSuccess?.(...args);
		},
		...restOptions
	});
};

type updateLanguageProps = {
	id: string;
	data: Partial<LanguageType>;
};

const updateLanguage = async ({ id, data }: updateLanguageProps): Promise<LanguageType> => {
	const response = await fetch(`${API_URL}/${id}`, {
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
	options?: UseMutationOptions<LanguageType, Error, updateLanguageProps>;
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

type deleteLanguageProps = {
	id: string;
};

const deleteLanguage = async ({ id }: deleteLanguageProps): Promise<boolean> => {
	const response = await fetch(`${API_URL}/${id}`, {
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
