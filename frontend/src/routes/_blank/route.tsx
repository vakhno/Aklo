import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { getSession } from "@/queries/auth";

export const Route = createFileRoute("/_blank")({
	beforeLoad: async ({ location }) => {
		// Skip auth check for OAuth callback and for roulette/room pages (allowed when not logged in)
		if (
			location.pathname === "/auth/google/callback"
			|| location.pathname.startsWith("/roulette/")
			|| location.pathname.startsWith("/room/")
		) {
			return;
		}

		let session;
		try {
			session = await getSession();
		}
		catch {
			// Don't redirect on getSession() errors (e.g. network) - let the route load
			return;
		}
		// Only redirect when we successfully got a response and there is no user
		if (!session || !("user" in session) || !session.user) {
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
