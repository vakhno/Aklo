import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { getSession } from "@/queries/auth";

export const Route = createFileRoute("/_blank")({
	beforeLoad: async ({ location }) => {
		// Skip auth check for OAuth callback route
		if (location.pathname === "/auth/google/callback") {
			return;
		}

		try {
			const session = await getSession();
			// Better Auth returns session data, check if user exists
			if (!session || !("user" in session) || !session.user) {
				throw redirect({ to: "/", search: { error: undefined } });
			}
		}
		catch {
			throw redirect({ to: "/", search: { error: undefined } });
		}
	},
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
