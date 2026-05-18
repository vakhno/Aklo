import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@shared/design-system/card";
import { Link } from "@tanstack/react-router";

import Logo from "@/assets/icon/logo.svg?react";
import LoginForm from "@/components/forms/login-form";

const LoginPage = () => {
	return (
		<div className="flex min-h-[calc(100dvh-3rem)] flex-col items-center justify-center gap-8 px-4 py-10 md:py-16">
			<div className="w-full max-w-md">
				<Card className="border border-border bg-card shadow-sm">
					<CardHeader className="space-y-1 text-center">
						<Link
							to="/"
							className="flex items-center justify-center gap-1"
						>
							<Logo className="size-10" />
							<span className="font-semibold text-xl">
								Aklo
								<sup>α</sup>
							</span>
						</Link>
						<CardTitle className="text-2xl font-semibold tracking-tight">
							Welcome to Aklo
						</CardTitle>
						<CardDescription className="text-balance">
							Sign in to access all features and your personal statistics.
						</CardDescription>
					</CardHeader>
					<CardContent className="pb-2">
						<LoginForm />
					</CardContent>
					<CardFooter className="flex flex-col gap-4 border-t border-border pt-6">
						<p className="text-center text-xs text-muted-foreground leading-relaxed">
							By signing in, you agree to our
							{" "}
							<Link
								to="/rules"
								target="_blank"
								className="underline underline-offset-2 hover:text-foreground transition-colors"
							>
								Rules
							</Link>
							,
							{" "}
							<Link
								to="/policy"
								target="_blank"
								className="underline underline-offset-2 hover:text-foreground transition-colors"
							>
								Privacy
							</Link>
							{" "}
							and
							{" "}
							<Link
								to="/terms"
								target="_blank"
								className="underline underline-offset-2 hover:text-foreground transition-colors"
							>
								Terms
							</Link>
							.
						</p>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
};

export default LoginPage;
