import { createFileRoute } from "@tanstack/react-router";

import PolicyPage from "@/components/pages/policy";

export const Route = createFileRoute("/_public/policy")({
	component: RouteComponent,
	head: () => ({
		meta: [{ title: "Aklo - Privacy" }]
	})
});

function RouteComponent() {
	return <PolicyPage />;
}
