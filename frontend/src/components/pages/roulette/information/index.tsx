import { Globe, HeartHandshake, MessageSquare, Mic, Shuffle, Sparkles, Video, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Information = () => {
	return (
		<>
			<section className="border-b">
				<div className="container mx-auto px-4 py-16 sm:py-20">
					<div className="grid lg:grid-cols-2 gap-12 items-center">
						<div className="space-y-6">
							<div className="flex items-center gap-3">
								<Badge variant="secondary" className="gap-2">
									<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
									Roulette Active
								</Badge>
							</div>

							<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
								You're Live with a Random Speaker
							</h1>

							<p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
								Surprise conversation with someone new from anywhere in the world -
								perfect for spontaneous language practice.
							</p>
						</div>

						<div className="space-y-6">
							<Card>
								<CardHeader>
									<Shuffle className="h-8 w-8 mb-2" />
									<CardTitle>Instant Random Matching</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground">
										Click “Next” anytime - you’re instantly connected to another language learner.
										No waiting, no planning.
									</p>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<Globe className="h-8 w-8 mb-2" />
									<CardTitle>Meet the World</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground">
										Practice with native speakers and learners from every corner of the planet -
										every chat is a new culture and accent.
									</p>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</section>

			<section className="py-16 lg:py-20">
				<div className="container mx-auto px-4 max-w-5xl space-y-20">

					<div className="text-center space-y-8">
						<h2 className="text-3xl sm:text-4xl font-bold">Talk However Feels Natural</h2>
						<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
							Check your mic, show your face, use chat - do whatever helps you speak more.
						</p>

						<div className="grid md:grid-cols-3 gap-8">

							<div className="space-y-4">
								<div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-muted">
									<Mic className="h-10 w-10" />
								</div>
								<h3 className="text-xl font-semibold">Jump Right In</h3>
								<p className="text-muted-foreground">Start speaking from the first second</p>
							</div>

							<div className="space-y-4">
								<div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-muted">
									<Video className="h-10 w-10" />
								</div>
								<h3 className="text-xl font-semibold">See Their Reactions</h3>
								<p className="text-muted-foreground">Real facial expressions and gestures</p>
							</div>

							<div className="space-y-4">
								<div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-muted">
									<MessageSquare className="h-10 w-10" />
								</div>
								<h3 className="text-xl font-semibold">Type When Stuck</h3>
								<p className="text-muted-foreground">Quickly ask “How do you say…?” in chat</p>
							</div>
						</div>
					</div>

					<Separator />

					<div className="space-y-12">
						<div className="text-center">
							<h2 className="text-3xl sm:text-4xl font-bold">Keep It Kind & Respectful</h2>
							<p className="mt-4 text-lg text-muted-foreground">
								Both of you can end the chat anytime - no hard feelings.
							</p>
						</div>

						<div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
							<Card>
								<CardHeader className="text-center pb-8">
									<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
										<HeartHandshake className="h-9 w-9" />
									</div>
									<CardTitle className="text-2xl">Be Friendly</CardTitle>
								</CardHeader>
								<CardContent className="text-center">
									<p className="text-muted-foreground">
										Say hello, smile, help with corrections - make it fun for both.
									</p>
								</CardContent>
							</Card>

							<Card>
								<CardHeader className="text-center pb-8">
									<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
										<Zap className="h-9 w-9" />
									</div>
									<CardTitle className="text-2xl">Not Clicking? Next!</CardTitle>
								</CardHeader>
								<CardContent className="text-center">
									<p className="text-muted-foreground">
										No spark? Just hit “Next” - you’ll be matched with someone new instantly.
									</p>
								</CardContent>
							</Card>
						</div>
					</div>

					<Separator />

					<div className="text-center space-y-6 bg-muted rounded-3xl p-12">
						<Sparkles className="h-14 w-14 mx-auto" />
						<h2 className="text-3xl font-bold">Every Chat Is a New Adventure</h2>
						<p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
							One click → one stranger → one real conversation.
							<br />
							<strong>This is how fluency happens.</strong>
						</p>
					</div>
				</div>
			</section>
		</>
	);
};

export default Information;
