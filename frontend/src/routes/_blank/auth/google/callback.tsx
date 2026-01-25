import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { getSession, type Session } from "@/queries/auth";

export const Route = createFileRoute("/_blank/auth/google/callback")({
	component: GoogleCallback,
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
				<svg
					className="w-40 h-40 overflow-visible"
					viewBox="0 0 100 100"
					xmlns="http://www.w3.org/2000/svg"
				>
					<style>
						{`
            @keyframes morphShape {
              0%, 100% {
                d: path("M50 10 C 50 10 84.6 70 84.6 70 C 84.6 70 15.4 70 15.4 70 C 15.4 70 50 10 50 10 Z");
              }
              50% {
                d: path("M50 10 C 80.8 10 100 43.3 84.6 70 C 69.2 96.7 30.8 96.7 15.4 70 C 0 43.3 19.2 10 50 10 Z");
              }
            }

            @keyframes spinHyper {
              0% { 
                transform: rotate(0deg); 
              }
              100% { 
                transform: rotate(1800deg); 
              }
            }
          `}
					</style>

					<path
						className="fill-[#fddb00] stroke-[#fddb00]"
						style={{
							animation: "morphShape 4s linear infinite, spinHyper 4s cubic-bezier(0.7, 0.05, 0.3, 1) infinite",
							transformOrigin: "50px 50px",
							strokeWidth: "14px",
							strokeLinejoin: "round"
						}}
						d="M50 10 C 50 10 84.6 70 84.6 70 C 84.6 70 15.4 70 15.4 70 C 15.4 70 50 10 50 10 Z"
					/>
				</svg>
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
