import { Link } from "@tanstack/react-router";
import { LogOut, Moon, Sun, Triangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils/cn";
import { useGetSession, useLogout } from "@/queries/auth";
import useThemeStore from "@/store/theme-store";

import { LoginDialog } from "./login-dialog";

interface HeaderProps {
	className?: string;
}

const Header = ({ className = "" }: HeaderProps) => {
	const { state: { theme }, toggleTheme } = useThemeStore();
	const { data: session, isLoading } = useGetSession();
	const logoutMutation = useLogout();

	const handleToggleTheme = () => {
		toggleTheme();
	};

	const handleLogout = async () => {
		await logoutMutation.mutateAsync();
	};

	const user = session?.user;
	const avatarUrl = user?.image || user?.picture;
	const userName = user?.name || user?.email?.split("@")[0] || "User";
	const userEmail = user?.email || "";

	const getInitials = (name: string) => {
		const parts = name.trim().split(/\s+/);
		if (parts.length >= 2) {
			return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
		}
		return name.substring(0, 2).toUpperCase();
	};

	return (
		<header className={cn("border border-t-0 container mx-auto bg-card sticky top-0 z-40 h-[var(--header-height)] mb-[var(--header-margin-bottom)] rounded-bl-xl rounded-br-xl px-10 flex items-center justify-between", className)}>
			<Link
				to="/"
			>
				<Triangle width={36} height={36} stroke="#fddb00" fill="#ffdd00" />
			</Link>
			<div className="flex items-center gap-2">
				<Button onClick={handleToggleTheme} variant="ghost" size="icon">
					{theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
				</Button>
				{isLoading
					? (
							<Skeleton className="h-10 w-10 rounded-full" />
						)
					: user
						? (
								<Popover>
									<PopoverTrigger asChild>
										<button
											className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-primary/20 hover:border-primary/40 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
											aria-label="User menu"
										>
											{avatarUrl
												? (
														<img
															src={avatarUrl}
															alt={userName}
															className="h-full w-full object-cover"
														/>
													)
												: (
														<div className="h-full w-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm">
															{getInitials(userName)}
														</div>
													)}
										</button>
									</PopoverTrigger>
									<PopoverContent className="w-64 p-0" align="end">
										<div className="p-4 space-y-2">
											<div className="flex items-center gap-3">
												{avatarUrl
													? (
															<img
																src={avatarUrl}
																alt={userName}
																className="h-12 w-12 rounded-full object-cover"
															/>
														)
													: (
															<div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
																{getInitials(userName)}
															</div>
														)}
												<div className="flex-1 min-w-0">
													<p className="font-medium text-sm truncate">{userName}</p>
													{userEmail && (
														<p className="text-xs text-muted-foreground truncate">{userEmail}</p>
													)}
												</div>
											</div>
										</div>
										<Separator />
										<div className="p-1">
											<Button
												variant="ghost"
												className="w-full justify-start gap-2"
												onClick={handleLogout}
												disabled={logoutMutation.isPending}
											>
												<LogOut className="h-4 w-4" />
												{logoutMutation.isPending ? "Logging out..." : "Logout"}
											</Button>
										</div>
									</PopoverContent>
								</Popover>
							)
						: (
								<LoginDialog />
							)}
			</div>
		</header>
	);
};

export default Header;
