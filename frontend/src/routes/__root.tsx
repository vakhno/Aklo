import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import Header from "@/components/compound/header";

export const Route = createRootRoute({
	component: () => (
		<>
			<Header />
			<main className="pt-26">
				<Outlet />
			</main>
			<TanStackRouterDevtools />
		</>
	)
});
