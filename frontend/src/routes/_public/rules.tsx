import { createFileRoute } from "@tanstack/react-router";

import RulesPage from "@/components/pages/rules";

export const Route = createFileRoute("/_public/rules")({
	component: RouteComponent,
	head: () => ({
		meta: [{ title: "Aklo - Rules" }]
	})
});

function RouteComponent() {
	return <RulesPage />;
}
