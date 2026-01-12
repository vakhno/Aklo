import { createFileRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "sonner";

export const Route = createFileRoute("/_conversation")({
	component: ConversationLayout
});

function ConversationLayout() {
	return (
		<>
			<main className="container mx-auto">
				<Outlet />
			</main>
			<Toaster />
			<TanStackRouterDevtools />
		</>
	);
}
