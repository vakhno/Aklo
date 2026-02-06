import { Link } from "@tanstack/react-router";
import { Github, Triangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils/cn";

interface FooterProps {
	className?: string;
}

const CURRENT_YEAR = new Date().getFullYear();

const Footer = ({ className = "" }: FooterProps) => {
	return (
		<footer
			className={cn(
				"border border-b-0 container mx-auto bg-card mt-[var(--header-margin-bottom)] rounded-tl-xl rounded-tr-xl p-6",
				className
			)}
		>
			<div className="flex flex-col gap-6">
				<div className="flex items-center justify-between gap-8 max-md:flex-col">
					<div className="flex flex-col gap-3 max-w-xs max-md:items-center">
						<Link to="/" className="flex items-center gap-2">
							<Triangle width={28} height={28} stroke="#fddb00" fill="#ffdd00" aria-hidden="true" />
							<span className="font-semibold text-lg">
								Aklo
								<sup>α</sup>
							</span>
						</Link>
						<p className="text-sm text-muted-foreground leading-relaxed max-md:text-center">
							Practice your foreign language with fellow learners through video chat roulettes and topic rooms.
						</p>
					</div>

					<nav aria-label="Footer navigation">
						<ul className="flex flex-wrap justify-center gap-2">
							<li>
								<Button variant="link" asChild className="h-auto p-0 text-muted-foreground hover:text-foreground">
									<Link to="/">
										Home
									</Link>
								</Button>
							</li>
							<li>
								<Button variant="link" asChild className="h-auto p-0 text-muted-foreground hover:text-foreground">
									<Link to="/rooms" hash="roulettes">
										Roulettes
									</Link>
								</Button>
							</li>
							<li>
								<Button variant="link" asChild className="h-auto p-0 text-muted-foreground hover:text-foreground">
									<Link to="/rooms" hash="topics">
										Topics
									</Link>
								</Button>
							</li>
							<li>
								<Button variant="link" asChild className="h-auto p-0 text-muted-foreground hover:text-foreground">
									<Link to="/rules">
										Rules
									</Link>
								</Button>
							</li>
							<li>
								<Button variant="link" asChild className="h-auto p-0 text-muted-foreground hover:text-foreground">
									<Link to="/policy">
										Policy
									</Link>
								</Button>
							</li>
							<li>
								<Button variant="link" asChild className="h-auto p-0 text-muted-foreground hover:text-foreground">
									<Link to="/terms">
										Terms
									</Link>
								</Button>
							</li>
						</ul>
					</nav>
					<Button
						// variant="outline"
						size="icon"
						asChild
					>
						<a
							href="https://github.com/vakhno"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="GitHub"
						>
							<Github className="h-4 w-4" aria-hidden="true" />
						</a>
					</Button>
				</div>
				<Separator />
				<div className="flex justify-center">
					<p className="text-sm">
						©
						{" "}
						{CURRENT_YEAR}
						{" "}
						Aklo. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
