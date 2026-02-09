import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Globe } from "lucide-react";

import HypercubePyramid from "@/components/compound/hypercube-pyramid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const HomePage = () => {
	return (
		<Card className="grid min-h-[calc(100dvh-var(--header-height)-var(--header-margin-bottom)-var(--header-margin-bottom))]">
			<CardContent className="grid grid-cols-2 gap-4 max-md:grid-cols-1 max-md:grid-rows-[auto_1fr] max-sm:grid-rows-[1fr]">
				<section
					className="grid gap-2 content-center grid-cols-1 max-sm:items-center"
				>
					<aside
						className="flex flex-wrap gap-2 max-md:justify-center"
					>
						<Badge variant="secondary">
							<Globe className="size-4" aria-hidden="true" />
							<span>Languages</span>
							<strong>+20</strong>
						</Badge>
					</aside>
					<h1	className="max-md:text-center">
						Aklo - language practice app
					</h1>
					<p className="max-md:text-center">
						Overcome the fear of speaking by practicing with people who are learning just like you.
						Join
						{" "}
						<strong>themed video rooms</strong>
						{" "}
						to discuss your interests or meet new
						practice partners in
						{" "}
						<strong>video-chat roulettes</strong>
						.
					</p>
					<nav
						className="flex gap-3 max-sm:justify-center max-sm:flex-col mb-4"
						aria-label="Primary navigation"
					>
						<Button asChild className="max-md:flex-1">
							<Link to="/rooms" hash="roulettes" aria-label="Start video chat roulette for language practice">
								<span>Go to Roulettes</span>
								<ArrowUpRight className="h-4 w-4" />
							</Link>
						</Button>
						<Button asChild className="max-md:flex-1">
							<Link to="/rooms" hash="topics" aria-label="Browse themed conversation rooms">
								<span>Go to Topics</span>
								<ArrowUpRight className="h-4 w-4" />
							</Link>
						</Button>
					</nav>

				</section>
				<HypercubePyramid className="min-h-[300px] max-sm:hidden" />
			</CardContent>
		</Card>
	);
};

export default HomePage;
