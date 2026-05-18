import { DICTIONARY } from "@shared/locales/constants";
import { COUNSUME_QUERIES, QUERIES, ROOT_QUERIES } from "@shared/routes/constants";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { toast } from "sonner";

import { useCurrentLocation } from "@/hooks/use-current-location";

export function SearchParamToastProvider() {
	const navigate = useNavigate();
	const { search } = useCurrentLocation();

	useEffect(() => {
		const usedSearch = {} as Record<string, undefined>;

		for (const key of ROOT_QUERIES) {
			if (search[key]) {
				if (key === QUERIES.ERROR_AUTH_TOAST) {
					toast.error(DICTIONARY.en.toast.error.socialAuthentication.heading, {
						description: DICTIONARY.en.toast.error.socialAuthentication.description
					});
				}
				if (COUNSUME_QUERIES.includes(key)) {
					usedSearch[key] = undefined;
				}
			}
		}

		navigate({ to: ".", search: { ...search, ...usedSearch }, replace: true });
	}, [search, navigate]);

	return null;
}
