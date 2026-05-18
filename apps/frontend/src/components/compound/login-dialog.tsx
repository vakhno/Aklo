import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@shared/design-system/dialog";
import { Link } from "@tanstack/react-router";

import LoginForm from "@/components/forms/login-form";

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
							target="_blank"
							className="underline hover:text-foreground transition-colors"
							onClick={() => onOpenChange?.(false)}
						>
							Rules
						</Link>
						,
						{" "}
						<Link
							to="/policy"
							target="_blank"
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
							target="_blank"
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
