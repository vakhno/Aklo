import { Link } from "@tanstack/react-router";
import { Globe, MessageSquare, Users } from "lucide-react";

import HypercubePyramid from "@/components/compound/hypercube-pyramid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const HomePage = () => {
	return (
		<Card className="grid min-h-[calc(100dvh-var(--header-height)-var(--header-margin-bottom)-var(--header-margin-bottom))]">
			<CardContent className="grid grid-cols-2 gap-8 max-md:grid-cols-1">
				<section
					className="grid content-center grid-cols-1"
					aria-labelledby="hero-title"
				>
					<h1
						id="hero-title"
						className="text-5xl mb-4 font-extrabold tracking-tighter leading-[0.9] max-md:text-center"
						itemProp="name"
					>
						Aklo — language practice app
					</h1>
					<p
						className="mb-4 text-sm leading-relaxed font-light max-md:text-center"
						itemProp="description"
					>
						Overcome the fear of speaking by practicing with people who are learning just like you.
						Join
						{" "}
						<strong>themed video rooms</strong>
						{" "}
						to discuss your interests or meet new
						practice partners in
						<strong>video-chat roulettes</strong>
						.
					</p>
					<nav
						className="flex gap-3 max-sm:justify-center max-sm:flex-col mb-6"
						aria-label="Primary navigation"
					>
						<Button asChild className="max-md:flex-1">
							<Link to="/rooms" hash="roulettes" aria-label="Start video chat roulette for language practice">
								Go to Roulettes
							</Link>
						</Button>
						<Button asChild className="max-md:flex-1">
							<Link to="/rooms" hash="topics" aria-label="Browse themed conversation rooms">
								Go to Topics
							</Link>
						</Button>
					</nav>
					<aside
						className="flex flex-wrap gap-2 max-md:justify-center"
						aria-label="Platform statistics"
					>
						<Badge variant="secondary">
							<Users className="h-4 w-4" aria-hidden="true" />
							<span>Active users</span>
							<strong>1,234</strong>
						</Badge>
						<Badge variant="secondary">
							<Globe className="h-4 w-4" aria-hidden="true" />
							<span>Languages</span>
							<strong>+50</strong>
						</Badge>
						<Badge variant="secondary">
							<MessageSquare className="h-4 w-4" aria-hidden="true" />
							<span>Topics</span>
							<strong>128</strong>
						</Badge>
					</aside>
				</section>
				<HypercubePyramid className="min-h-[200px]" />
			</CardContent>
		</Card>
	);
};

export default HomePage;
