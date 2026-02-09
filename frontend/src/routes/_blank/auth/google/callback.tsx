import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import LogoSpinner from "@/assets/icon/logo-spinner.svg?react";
import { getSession, type Session } from "@/queries/auth";

export const Route = createFileRoute("/_blank/auth/google/callback")({
	component: GoogleCallback,
	head: () => ({
		meta: [{ title: "Aklo - Signing in" }]
	}),
	validateSearch: (search?: Record<string, unknown>) => {
		return {
			error: search?.error
		};
	}
});

function GoogleCallback() {
	const search = useSearch({ from: "/_blank/auth/google/callback" });
	const queryClient = useQueryClient();
	const [userEmail, setUserEmail] = useState<string | null>(null);

	useEffect(() => {
		(async () => {
			if (search.error) {
				sessionStorage.removeItem("oauth_redirect");
				window.location.replace("/?error=google_auth_failed");
				return;
			}

			try {
				const session = await getSession();
				const user = (session as Session)?.user || null;

				if (user && (user.email || user.id || user.name)) {
					if (user.email) {
						setUserEmail(user.email);
					}

					queryClient.invalidateQueries({ queryKey: ["session"] });
					const redirectPath = sessionStorage.getItem("oauth_redirect") || "/";
					sessionStorage.removeItem("oauth_redirect");
					window.location.replace(redirectPath);
				}
				else {
					sessionStorage.removeItem("oauth_redirect");
					window.location.replace("/?error=google_auth_failed");
				}
			}
			catch (err) {
				console.error("Session check failed:", err);
				sessionStorage.removeItem("oauth_redirect");
				window.location.replace("/?error=google_auth_failed");
			}
		})();
	}, [search.error, queryClient]);

	return (
		<div className="min-h-screen flex items-center justify-center bg-background">
			<div className="flex flex-col items-center gap-4 text-center">
				<LogoSpinner className="size-10" />
				<div className="space-y-1">
					<p className="text-lg font-medium">
						Signing in through Google
					</p>
					{userEmail && (
						<p className="text-sm text-muted-foreground">
							{userEmail}
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
