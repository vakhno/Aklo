import { Link } from "@tanstack/react-router";
import { ArrowUpRight, LayoutDashboard, Menu, Moon, Sun } from "lucide-react";
import { useState } from "react";

import Logo from "@/assets/icon/logo.svg?react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils/cn";
import { useGetSession, useLogout } from "@/queries/auth";
import { useAuthStore } from "@/store/auth-store";
import useThemeStore from "@/store/theme-store";

import { LoginDialog } from "./login-dialog";

interface HeaderProps {
	className?: string;
}

const Header = ({ className = "" }: HeaderProps) => {
	const { state: { theme }, toggleTheme } = useThemeStore();
	const { showLoginModal, openLoginModal, closeLoginModal } = useAuthStore();
	const { data: session, isLoading } = useGetSession();
	const logoutMutation = useLogout();
	const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
	const [isMenuDialogOpen, setIsMenuDialogOpen] = useState(false);

	const handleToggleTheme = () => {
		toggleTheme();
	};

	const handleLogout = async () => {
		await logoutMutation.mutateAsync();
		setIsProfileDialogOpen(false);
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
		<header className={cn("border border-t-0 container mx-auto bg-card sticky top-0 z-40 h-[var(--header-height)] mb-[var(--header-margin-bottom)] rounded-bl-xl rounded-br-xl px-6 flex items-center justify-between", className)}>
			<Link
				to="/"
				className="flex items-center gap-1"
			>
				<Logo className="size-10" />
				<span className="font-semibold text-xl">
					Aklo
					<sup>α</sup>
				</span>
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
								<>
									<Button
										variant="ghost"
										size="icon-lg"
										className="relative rounded-full overflow-hidden border-2 border-primary/20 hover:border-primary/40 transition-colors p-0"
										aria-label="User menu"
										onClick={() => setIsProfileDialogOpen(true)}
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
									</Button>
									<Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
										<DialogContent className="sm:max-w-md">
											<DialogHeader>
												<DialogTitle>Profile</DialogTitle>
											</DialogHeader>
											<div className="space-y-4">
												<div className="flex flex-col items-center gap-1">
													{avatarUrl
														? (
																<img
																	src={avatarUrl}
																	alt={userName}
																	className="h-16 w-16 rounded-full object-cover"
																/>
															)
														: (
																<div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-lg">
																	{getInitials(userName)}
																</div>
															)}
													<div className="flex flex-col items-center gap-1">
														<p className="font-medium text-base truncate">{userName}</p>
														{userEmail && (
															<p className="text-sm text-muted-foreground truncate">{userEmail}</p>
														)}
													</div>
												</div>
												<Separator />
												{(user as { role?: string }).role === "admin" && (
													<Button variant="secondary" className="w-full justify-start gap-2" asChild>
														<Link to="/dashboard" onClick={() => setIsProfileDialogOpen(false)}>
															<LayoutDashboard className="h-4 w-4" />
															Dashboard
														</Link>
													</Button>
												)}
												<Button
													variant="destructive"
													className="w-full justify-start gap-2"
													onClick={handleLogout}
													disabled={logoutMutation.isPending}
												>
													{logoutMutation.isPending ? "Logging out..." : "Logout"}
												</Button>
											</div>
										</DialogContent>
									</Dialog>
								</>
							)
						: (
								<>
									<Button variant="secondary" onClick={openLoginModal}>
										Sign in
									</Button>
									<LoginDialog
										open={showLoginModal}
										onOpenChange={open => (open ? openLoginModal() : closeLoginModal())}
									/>
								</>
							)}
				<Button
					variant="ghost"
					size="icon"
					aria-label="Menu"
					onClick={() => setIsMenuDialogOpen(true)}
				>
					<Menu className="h-5 w-5" />
				</Button>
				<Dialog open={isMenuDialogOpen} onOpenChange={setIsMenuDialogOpen}>
					<DialogContent className="sm:max-w-sm">
						<DialogHeader>
							<DialogTitle>
								Explore Aklo
							</DialogTitle>
							<DialogDescription>
								Select exactly what you want to visit.
							</DialogDescription>
						</DialogHeader>
						<nav className="mx-auto flex w-full flex-col gap-2">
							<Button
								className="w-full justify-between gap-2"
								asChild
								onClick={() => setIsMenuDialogOpen(false)}
							>
								<Link to="/" className="flex w-full items-center">
									Home
									<ArrowUpRight className="h-4 w-4" />
								</Link>
							</Button>
							<Button
								className="w-full justify-between gap-2"
								asChild
								onClick={() => setIsMenuDialogOpen(false)}
							>
								<Link to="/rooms" hash="roulettes" className="flex w-full items-center">
									Roulettes
									<ArrowUpRight className="h-4 w-4" />
								</Link>
							</Button>
							<Button
								className="w-full justify-between gap-2"
								asChild
								onClick={() => setIsMenuDialogOpen(false)}
							>
								<Link to="/rooms" hash="topics" className="flex w-full items-center">
									Topics
									<ArrowUpRight className="h-4 w-4" />
								</Link>
							</Button>
							<Button
								className="w-full justify-between gap-2"
								asChild
								onClick={() => setIsMenuDialogOpen(false)}
							>
								<Link to="/rules" className="flex w-full items-center">
									Rules
									<ArrowUpRight className="h-4 w-4" />
								</Link>
							</Button>
						</nav>
						<DialogFooter className="justify-center sm:justify-center">
							<p className="text-center text-xs">
								Before use, please read
								{" "}
								<Link to="/rules" className="underline hover:text-foreground transition-colors">
									Rules
								</Link>
								,
								{" "}
								<Link to="/policy" className="underline hover:text-foreground transition-colors">
									Privacy
								</Link>
								{" "}
								and
								{" "}
								<Link to="/terms" className="underline hover:text-foreground transition-colors">
									Terms
								</Link>
								.
							</p>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</header>
	);
};

export default Header;
