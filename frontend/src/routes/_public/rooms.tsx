import { createFileRoute } from "@tanstack/react-router";

import ConversationPage from "@/components/pages/conversation";

export const Route = createFileRoute("/_public/rooms")({
	component: RouteComponent
});

function RouteComponent() {
	return <ConversationPage />;
}
