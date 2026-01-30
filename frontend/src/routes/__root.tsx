import type { SearchSchemaInput } from "@tanstack/react-router";

import { createRootRoute, Outlet, useNavigate, useSearch } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useEffect } from "react";
import { toast, Toaster } from "sonner";

import { useGetSession } from "@/queries/auth";
import useThemeStore from "@/store/theme-store";

export const Route = createRootRoute({
	component: () => RootLayout(),
	validateSearch: (search?: Record<string, unknown> & SearchSchemaInput) => {
		return {
			error: search?.error
		};
	}
});

function RootLayout() {
	const { state: { theme } } = useThemeStore();
	const navigate = useNavigate();
	const search = useSearch({ from: "__root__" }) as { error?: string };

	useEffect(() => {
		if (search?.error === "google_auth_failed") {
			toast.error("Authentication failed", {
				description: "There was an error signing in with Google. Please try again."
			});

			navigate({ search: undefined, replace: true });
		}
	}, [search?.error, navigate]);

	useGetSession({
		options: {
			refetchIntervalInBackground: true,
			refetchOnWindowFocus: true,
			refetchInterval: 10 * 60 * 1000,
			staleTime: 10 * 60 * 1000
		}
	});

	useEffect(() => {
		const html = document.documentElement;
		html.classList.remove("light", "dark");
		html.classList.add(theme);
	}, [theme]);

	return (
		<>
			<Outlet />
			<Toaster />
			<TanStackRouterDevtools />
		</>
	);
}
