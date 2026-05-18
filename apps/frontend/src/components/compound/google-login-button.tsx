import { Button } from "@shared/design-system/button";
import { useSocialLogin } from "@shared/queries";
import { QUERIES, ROUTES } from "@shared/routes/constants";

import Google from "@/assets/social/google.svg?react";
import { cn } from "@/lib/utils/cn";

interface GoogleLoginButtonProps {
	className?: string;
}

const GoogleLoginButton = ({ className }: GoogleLoginButtonProps) => {
	const callbackURL = `${import.meta.env.VITE_APP_URL}${ROUTES.PROFILE.path}`;
	const newUserCallbackURL = `${import.meta.env.VITE_APP_URL}${ROUTES.PROFILE.path}`;
	const errorCallbackURL = `${import.meta.env.VITE_APP_URL}${ROUTES.LOGIN.path}?${QUERIES.ERROR_AUTH_TOAST}=true`;
	const { mutate: loginWithGoogle } = useSocialLogin({ socialOptions: { provider: "google", callbackURL, newUserCallbackURL, errorCallbackURL } });

	const handleGoogleLogin = async () => {
		try {
			await loginWithGoogle();
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
