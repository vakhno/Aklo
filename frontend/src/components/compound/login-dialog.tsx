import { Link } from "@tanstack/react-router";

import LoginForm from "@/components/forms/login-form";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface LoginDialogProps {
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}

export function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[400px]">
				<DialogHeader>
					<DialogTitle>
						Welcome to Aklo
					</DialogTitle>
					<DialogDescription>
						Sign in to have access to all features and personal statistic.
					</DialogDescription>
				</DialogHeader>
				<LoginForm />
				<DialogFooter className="justify-center sm:justify-center">
					<p className="text-center text-xs">
						By signing in, you agree with
						{" "}
						<Link
							to="/rules"
							className="underline hover:text-foreground transition-colors"
							onClick={() => onOpenChange?.(false)}
						>
							Rules
						</Link>
						,
						{" "}
						<Link
							to="/policy"
							className="underline hover:text-foreground transition-colors"
							onClick={() => onOpenChange?.(false)}
						>
							Privacy
						</Link>
						{" "}
						and
						{" "}
						<Link
							to="/terms"
							className="underline hover:text-foreground transition-colors"
							onClick={() => onOpenChange?.(false)}
						>
							Terms
						</Link>
						.
					</p>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
