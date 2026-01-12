import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useEffect } from "react";
import { Toaster } from "sonner";

import useThemeStore from "@/store/theme-store";

export const Route = createRootRoute({
	component: () => RootLayout()
});

function RootLayout() {
	const { state: { theme } } = useThemeStore();

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
