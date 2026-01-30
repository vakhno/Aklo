import { Link } from "@tanstack/react-router";
import { Triangle } from "lucide-react";

import LoginForm from "@/components/forms/login-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface LoginDialogProps {
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}

export function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogTrigger asChild>
				<Button variant="outline">Sign in</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[400px]">
				<DialogHeader className="space-y-4 text-center">
					<div className="mx-auto">
						<Triangle width={48} height={48} stroke="#fddb00" fill="#ffdd00" />
					</div>
					<DialogTitle className="text-xl font-semibold text-center">
						Sign in
					</DialogTitle>
				</DialogHeader>
				<LoginForm />
				<p className="text-xs text-center text-muted-foreground pt-4 pb-2">
					By signing in, you agree with
					{" "}
					<Link to="/rules" className="underline hover:text-foreground transition-colors">
						Rules
					</Link>
					,
					{" "}
					<Link to="/rules" className="underline hover:text-foreground transition-colors">
						Privacy
					</Link>
					{" "}
					and
					{" "}
					<Link to="/rules" className="underline hover:text-foreground transition-colors">
						Terms
					</Link>
					.
				</p>
			</DialogContent>
		</Dialog>
	);
}
