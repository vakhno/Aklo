import { getAuthClient, getClientSessionUser, isClientAuthenticated } from "@shared/auth/client";
import { ROLES } from "@shared/auth/constants";
import { useGetSession } from "@shared/queries";
import { ROUTES } from "@shared/routes/constants";
import { isAdminRoleRequiredPage, isAuthRequiredPage, isBlockedDuringAuthPage, pickRootSearchQueries } from "@shared/routes/utils";
import { createRootRoute, HeadContent, Outlet, redirect } from "@tanstack/react-router";
import { useEffect } from "react";

import { useTheme } from "@/hooks/use-theme";
import { SearchParamToastProvider } from "@/providers/search-params-toast-provider";

export const Route = createRootRoute({
	beforeLoad: async ({ location }) => {
		const { pathname } = location;
		const isAuthRequired = isAuthRequiredPage(pathname);
		const isBlockedDuringAuth = isBlockedDuringAuthPage(pathname);
		const isAdminRoleRequired = isAdminRoleRequiredPage(pathname);

		if (isBlockedDuringAuth) {
			const client = getAuthClient();
			const isAuthenticated = await isClientAuthenticated({ client });

			if (isAuthenticated) {
				return redirect({ to: ROUTES.HOME.path, replace: true });
			}

			return;
		}

		if (isAuthRequired) {
			const client = getAuthClient();
			const isAuthenticated = await isClientAuthenticated({ client });

			if (!isAuthenticated) {
				return redirect({ to: ROUTES.LOGIN.path, replace: true });
			}

			return;
		}

		if (isAdminRoleRequired) {
			const client = getAuthClient();
			const isAuthenticated = await isClientAuthenticated({ client });

			if (isAuthenticated) {
				const user = await getClientSessionUser({ client });

				if (user) {
					const { role } = user;

					if (role !== ROLES.ADMIN) {
						return redirect({ to: ROUTES.HOME.path, replace: true });
					}
				}
			}
		}
	},
	component: () => RootLayout(),
	validateSearch: (search: Record<string, unknown>) => {
		return pickRootSearchQueries(search);
	}
});

function RootLayout() {
	useEffect(() => {
	}, []);
	useTheme();

	useGetSession({
		options: {
			refetchIntervalInBackground: true,
			refetchOnWindowFocus: true,
			refetchInterval: 10 * 60 * 1000,
			staleTime: 10 * 60 * 1000
		}
	});

	return (
		<>
			<HeadContent />
			<Outlet />
			<SearchParamToastProvider />
		</>
	);
}
