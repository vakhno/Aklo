import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "sonner";

import Header from "@/components/compound/header";

export const Route = createRootRoute({
	component: () => (
		<>
			<Header className="mb-4" />
			<main className="container w-full px-4 mx-auto h-full">
				<Outlet />
			</main>
			<Toaster />
			<TanStackRouterDevtools />
		</>
	)
});
