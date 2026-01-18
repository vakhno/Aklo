import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_conversation")({
	component: ConversationLayout
});

function ConversationLayout() {
	return (
		<>
			<main className="container mx-auto">
				<Outlet />
			</main>
		</>
	);
}
