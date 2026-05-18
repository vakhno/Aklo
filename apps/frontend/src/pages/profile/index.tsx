import { Button } from "@shared/design-system/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@shared/design-system/card";
import { Separator } from "@shared/design-system/separator";
import { Skeleton } from "@shared/design-system/skeleton";
import { useGetSession } from "@shared/queries";
import { Link } from "@tanstack/react-router";

function getInitials(name: string) {
	const parts = name.trim().split(/\s+/);
	if (parts.length >= 2) {
		return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
	}
	return name.substring(0, 2).toUpperCase();
}

export default function ProfilePage() {
	const { data: session, isLoading } = useGetSession();

	const user = session?.user;
	const avatarUrl = user?.image ?? (user as { picture?: string } | undefined)?.picture;
	const userName = user?.name || user?.email?.split("@")[0] || "User";
	const userEmail = user?.email ?? "";
	const role = user ? (user as { role?: string }).role : undefined;

	return (
		<div className="container mx-auto max-w-lg px-4 py-10 md:py-16">
			<Card className="border border-border bg-card shadow-sm">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl font-semibold tracking-tight">
						Profile
					</CardTitle>
					<CardDescription>
						Your account details from your sign-in provider.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					{isLoading
						? (
								<div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
									<Skeleton className="size-24 shrink-0 rounded-full" />
									<div className="flex w-full flex-col gap-3">
										<Skeleton className="h-6 w-48" />
										<Skeleton className="h-4 w-full max-w-sm" />
										<Skeleton className="h-4 w-32" />
									</div>
								</div>
							)
						: user
							? (
									<>
										<div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
											{avatarUrl
												? (
														<img
															src={avatarUrl}
															alt={userName}
															className="size-24 shrink-0 rounded-full object-cover ring-2 ring-primary/15"
														/>
													)
												: (
														<div className="flex size-24 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-medium text-primary ring-2 ring-primary/15">
															{getInitials(userName)}
														</div>
													)}
											<div className="min-w-0 flex-1 space-y-1 text-center sm:text-left">
												<p className="truncate text-lg font-semibold text-foreground">
													{userName}
												</p>
												{userEmail && (
													<p className="truncate text-sm text-muted-foreground">
														{userEmail}
													</p>
												)}
												{role && (
													<p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
														Role:
														{" "}
														<span className="text-foreground">{role}</span>
													</p>
												)}
											</div>
										</div>
										<Separator />
										<p className="text-xs text-muted-foreground">
											Signed in with your linked account. To change your name or photo, update them at your identity provider (e.g. Google) if supported.
										</p>
									</>
								)
							: (
									<p className="text-sm text-muted-foreground">
										No session found. If you expected to see your profile, try signing in again.
									</p>
								)}
					<div className="flex flex-wrap gap-2 pt-2">
						<Button variant="outline" size="sm" asChild>
							<Link to="/">Back to home</Link>
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
