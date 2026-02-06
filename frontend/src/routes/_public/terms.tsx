import { createFileRoute } from "@tanstack/react-router";

import TermsPage from "@/components/pages/terms";

export const Route = createFileRoute("/_public/terms")({
	component: RouteComponent,
	head: () => ({
		meta: [{ title: "Aklo - Terms" }]
	})
});

function RouteComponent() {
	return <TermsPage />;
}
