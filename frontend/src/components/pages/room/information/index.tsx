import { Globe, HeartHandshake, MessageSquare, Mic, Sparkles, Users, Video } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils/cn";

interface InformationProps {
	className?: string;
}

const Information = ({ className }: InformationProps) => {
	return (
		<div className={cn("h-dvh min-h-[420px]", className)}>
			<section className="border-b">
				<div className="container mx-auto px-4 py-16 sm:py-20">
					<div className="grid lg:grid-cols-2 gap-12 items-center">
						<div className="space-y-6">
							<div className="flex items-center gap-3">
								<Badge variant="secondary" className="gap-2">
									<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
									Room Active
								</Badge>
							</div>

							<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
								Welcome to topic room
							</h1>

							<p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
								This is
								{" "}
								<strong>your space</strong>
								{" "}
								to speak freely, make mistakes, laugh, and improve -
								with real people who share your passion for languages.
							</p>
						</div>

						<div className="space-y-6">
							<Card>
								<CardHeader>
									<Sparkles className="h-8 w-8 mb-2" />
									<CardTitle>Create Your Own Room</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground">
										Set any topic you want - “English morning coffee”, “Japanese anime talk”,
										“Spanish travel stories” - and attract people who truly share your interests.
									</p>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<HeartHandshake className="h-8 w-8 mb-2" />
									<CardTitle>Practice with Like-Minded People</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground">
										Up to 4 learners at once. No teachers, no pressure - just real conversation
										with people who want to improve like you.
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
						<h2 className="text-3xl sm:text-4xl font-bold">Speak Freely - However You Want</h2>
						<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
							Turn your camera on or off, mute when you need a break, type in chat -
							everything is allowed. This is a safe space to learn.
						</p>

						<div className="grid md:grid-cols-3 gap-8">
							<div className="space-y-4">
								<div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-muted">
									<Mic className="h-10 w-10" />
								</div>
								<h3 className="text-xl font-semibold">Speak Out Loud</h3>
								<p className="text-muted-foreground">Practice pronunciation naturally</p>
							</div>

							<div className="space-y-4">
								<div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-muted">
									<Video className="h-10 w-10" />
								</div>
								<h3 className="text-xl font-semibold">See Facial Expressions</h3>
								<p className="text-muted-foreground">Understand emotions and gestures</p>
							</div>

							<div className="space-y-4">
								<div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-muted">
									<MessageSquare className="h-10 w-10" />
								</div>
								<h3 className="text-xl font-semibold">Write When Shy</h3>
								<p className="text-muted-foreground">Use chat to ask for words or clarify</p>
							</div>

						</div>
					</div>

					<Separator />

					<div className="space-y-12">
						<div className="text-center">
							<h2 className="text-3xl sm:text-4xl font-bold">Let’s Make This Room Awesome Together</h2>
							<p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
								We’re all here to practice and help each other - just a few simple things to remember.
							</p>
						</div>

						<div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">

							<Card className="text-center">
								<CardHeader className="pb-8">
									<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
										<HeartHandshake className="h-9 w-9" />
									</div>
									<CardTitle className="text-2xl">Be Kind & Patient</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground">
										Smile, say hello, help with corrections - we’re all learning.
									</p>
								</CardContent>
							</Card>

							<Card className="text-center">
								<CardHeader className="pb-8">
									<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
										<MessageSquare className="h-9 w-9" />
									</div>
									<CardTitle className="text-2xl">Speak Clearly & Slowly</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground">
										Give everyone a chance to understand and respond.
									</p>
								</CardContent>
							</Card>

							<Card className="text-center">
								<CardHeader className="pb-8">
									<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
										<Users className="h-9 w-9" />
									</div>
									<CardTitle className="text-2xl">Stay On Topic</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground">
										Let’s keep the conversation helpful for the room’s theme.
									</p>
								</CardContent>
							</Card>

						</div>
					</div>

					<Separator />

					<div className="text-center space-y-6 bg-muted rounded-3xl p-12">
						<Globe className="h-14 w-14 mx-auto" />
						<h2 className="text-3xl font-bold">This Is Your Practice Space</h2>
						<p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
							No grades. No judgment. Just real people helping each other speak better.
							<br />
							<strong>Make mistakes. Laugh. Improve together.</strong>
						</p>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Information;
