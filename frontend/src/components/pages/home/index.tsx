import { Link } from "@tanstack/react-router";

import HypercubePyramid from "@/components/compound/hypercube-pyramid";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const HomePage = () => {
	return (
		<Card className="grid min-h-[calc(100dvh-var(--header-height)-var(--header-margin-bottom)-var(--header-margin-bottom))]">
			<CardContent className="grid grid-cols-2 gap-8 max-md:grid-cols-1">
				<div className="grid content-center grid-cols-1">
					<h1 className="text-5xl mb-4 font-extrabold tracking-tighter leading-[0.9] max-md:text-center">Aklo — talk with pleasure</h1>
					<p className="mb-4 text-sm leading-relaxed font-light max-md:text-center">Aklo helps you learn foreign languages through real conversations. Practice with people from around the world using video-chat roulette or join themed video rooms focused on specific topics. Speak more, stress less, and learn naturally.</p>
					<Button asChild>
						<Link to="/rooms">Get started</Link>
					</Button>
				</div>
				<HypercubePyramid className="min-h-[200px]" />
			</CardContent>
		</Card>
	);
};

export default HomePage;
