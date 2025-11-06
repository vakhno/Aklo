import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useEffect } from "react";
import { Toaster } from "sonner";

import Header from "@/components/compound/header";
import useThemeStore from "@/store/theme-store";

function RootComponent() {
	const { state: { theme } } = useThemeStore();

	useEffect(() => {
		const html = document.documentElement;
		html.classList.remove("light", "dark");
		html.classList.add(theme);
	}, [theme]);

	return (
		<>
			<Header />
			<main className="container mx-auto">
				<Outlet />
			</main>
			<Toaster />
			<TanStackRouterDevtools />
		</>
	);
}

export const Route = createRootRoute({
	component: () => RootComponent()
});
