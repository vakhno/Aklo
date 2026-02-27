import { createFileRoute, redirect } from "@tanstack/react-router";

import DashboardPage from "@/components/pages/dashboard";
import { getSession } from "@/queries/auth";

export const Route = createFileRoute("/_public/dashboard")({
	beforeLoad: async () => {
		let session;
		try {
			session = await getSession();
		}
		catch {
			throw redirect({ to: "/" });
		}

		if (!session || !session.user) {
			throw redirect({ to: "/" });
		}

		const user = session.user as { role?: string };
		if (user.role !== "admin") {
			throw redirect({ to: "/" });
		}
	},
	component: DashboardPage
});
