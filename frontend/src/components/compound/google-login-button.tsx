import { useRouterState } from "@tanstack/react-router";

import Google from "@/assets/social/google.svg?react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { loginWithGoogle } from "@/queries/auth";

interface GoogleLoginButtonProps {
	className?: string;
}

const GoogleLoginButton = ({ className }: GoogleLoginButtonProps) => {
	const routerState = useRouterState();

	const handleGoogleLogin = async () => {
		try {
			const currentPath = routerState.location?.pathname || "/";
			const currentSearch = routerState.location?.search || {};
			const redirectPath = currentPath + (Object.keys(currentSearch).length > 0 ? `?${new URLSearchParams(currentSearch as Record<string, string>).toString()}` : "");

			await loginWithGoogle(redirectPath);
		}
		catch (error) {
			console.error("Google login failed:", error);
		}
	};

	return (
		<Button
			onClick={handleGoogleLogin}
			className={cn(
				"w-full h-11 flex items-center justify-center gap-2",
				className
			)}
			variant="secondary"
		>
			<Google className="size-6" />
			<span>Sign in with Google</span>
		</Button>
	);
};

export default GoogleLoginButton;
