import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_blank")({
	// beforeLoad: async ({ location }) => {
	// 	// Skip auth check for OAuth callback and for roulette/room pages (allowed when not logged in)
	// 	if (
	// 		location.pathname.startsWith("/auth/google/callback")
	// 		|| location.pathname === "/auth/login"
	// 		|| location.pathname.startsWith("/roulette/")
	// 		|| location.pathname.startsWith("/room/")
	// 	) {
	// 		return;
	// 	}

	// 	let session;
	// 	try {
	// 		const client = getAuthClient();
	// 		session = await getClientSession({ client });
	// 	}
	// 	catch {
	// 		// Don't redirect on getSession() errors (e.g. network) - let the route load
	// 		return;
	// 	}
	// 	// Only redirect when we successfully got a response and there is no user
	// 	if (!session || !("user" in session) || !session.user) {
	// 		throw redirect({ to: "/", search: { error: undefined } });
	// 	}
	// },
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
