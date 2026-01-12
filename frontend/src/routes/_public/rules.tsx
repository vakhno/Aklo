import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Ban, Camera, CheckCircle2, Flag, Heart, Lightbulb, MessageSquare, Shield, Users, Volume2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Rules = () => {
	return (
		<div className="min-h-screen bg-background">
			<section className="border-b bg-gradient-to-b from-muted/50 to-background">
				<div className="container mx-auto px-4 py-16 sm:py-20">
					<div className="max-w-4xl mx-auto text-center space-y-6">
						<Badge variant="secondary" className="gap-2">
							<Shield className="h-3 w-3" />
							Community Guidelines
						</Badge>
						handleSelectRoulette
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
							Rules & Regulations
						</h1>

						<p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
							We provide a safe platform for language learners to connect and practice together.
							These simple rules ensure a respectful and enjoyable experience for everyone.
						</p>

						<Card className="max-w-2xl mx-auto border-orange-200 bg-orange-50 dark:bg-orange-950 dark:border-orange-800">
							<CardHeader>
								<div className="flex items-start gap-3">
									<AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
									<CardDescription className="text-orange-800 dark:text-orange-200 text-base">
										By using our language rooms, you agree to follow these rules. Violations may result in warnings or permanent bans from the platform.
									</CardDescription>
								</div>
							</CardHeader>
						</Card>
					</div>
				</div>
			</section>

			<section className="py-16">
				<div className="container mx-auto px-4 max-w-5xl">
					<div className="space-y-8">

						<Card>
							<CardHeader>
								<div className="flex items-center gap-4 mb-4">
									<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-red-500">
										<Heart className="h-6 w-6" />
									</div>
									<CardTitle className="text-2xl">1. Be Respectful & Kind</CardTitle>
								</div>
							</CardHeader>
							<CardContent>
								<p className="font-semibold text-sm text-muted-foreground uppercase mb-4">It is forbidden to:</p>
								<ul className="space-y-3">
									<li className="flex items-start gap-3">
										<Ban className="h-4 w-4 mt-1 text-destructive flex-shrink-0" />
										<span className="text-muted-foreground">Use polite and friendly language at all times</span>
									</li>
									<li className="flex items-start gap-3">
										<Ban className="h-4 w-4 mt-1 text-destructive flex-shrink-0" />
										<span className="text-muted-foreground">Avoid insulting, mocking, or being rude to other participants</span>
									</li>
									<li className="flex items-start gap-3">
										<Ban className="h-4 w-4 mt-1 text-destructive flex-shrink-0" />
										<span className="text-muted-foreground">No offensive gestures or expressions</span>
									</li>
									<li className="flex items-start gap-3">
										<Ban className="h-4 w-4 mt-1 text-destructive flex-shrink-0" />
										<span className="text-muted-foreground">No discrimination based on race, religion, nationality, gender, age, or appearance</span>
									</li>
									<li className="flex items-start gap-3">
										<Ban className="h-4 w-4 mt-1 text-destructive flex-shrink-0" />
										<span className="text-muted-foreground">No threats or intimidating behavior of any kind</span>
									</li>
								</ul>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<div className="flex items-center gap-4 mb-4">
									<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-blue-500">
										<Shield className="h-6 w-6" />
									</div>
									<CardTitle className="text-2xl">2. Keep It Appropriate</CardTitle>
								</div>
							</CardHeader>
							<CardContent>
								<p className="font-semibold text-sm text-muted-foreground uppercase mb-4">It is forbidden to:</p>
								<ul className="space-y-3">
									<li className="flex items-start gap-3">
										<Ban className="h-4 w-4 mt-1 text-destructive flex-shrink-0" />
										<span className="text-muted-foreground">Dress appropriately as if in a public space</span>
									</li>
									<li className="flex items-start gap-3">
										<Ban className="h-4 w-4 mt-1 text-destructive flex-shrink-0" />
										<span className="text-muted-foreground">Keep your camera focused on your face</span>
									</li>
									<li className="flex items-start gap-3">
										<Ban className="h-4 w-4 mt-1 text-destructive flex-shrink-0" />
										<span className="text-muted-foreground">No inappropriate content, gestures, or suggestions</span>
									</li>
									<li className="flex items-start gap-3">
										<Ban className="h-4 w-4 mt-1 text-destructive flex-shrink-0" />
										<span className="text-muted-foreground">Maintain a family-friendly environment</span>
									</li>
									<li className="flex items-start gap-3">
										<Ban className="h-4 w-4 mt-1 text-destructive flex-shrink-0" />
										<span className="text-muted-foreground">No romantic or dating solicitations</span>
									</li>
								</ul>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<div className="flex items-center gap-4 mb-4">
									<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-purple-500">
										<Camera className="h-6 w-6" />
									</div>
									<CardTitle className="text-2xl">3. Proper Camera Usage</CardTitle>
								</div>
							</CardHeader>
							<CardContent>
								<p className="font-semibold text-sm text-muted-foreground uppercase mb-4">It is forbidden to:</p>
								<ul className="space-y-3">
									<li className="flex items-start gap-3">
										<Ban className="h-4 w-4 mt-1 text-destructive flex-shrink-0" />
										<span className="text-muted-foreground">Show your face clearly - people want to see who they're talking to</span>
									</li>
									<li className="flex items-start gap-3">
										<Ban className="h-4 w-4 mt-1 text-destructive flex-shrink-0" />
										<span className="text-muted-foreground">Ensure good lighting so others can see you properly</span>
									</li>
									<li className="flex items-start gap-3">
										<Ban className="h-4 w-4 mt-1 text-destructive flex-shrink-0" />
										<span className="text-muted-foreground">Don't point camera at screens (TV, computer, phone, etc.)</span>
									</li>
									<li className="flex items-start gap-3">
										<Ban className="h-4 w-4 mt-1 text-destructive flex-shrink-0" />
										<span className="text-muted-foreground">Avoid showing photos, drawings, or text signs</span>
									</li>
									<li className="flex items-start gap-3">
										<Ban className="h-4 w-4 mt-1 text-destructive flex-shrink-0" />
										<span className="text-muted-foreground">No camera filters, masks, or virtual backgrounds</span>
									</li>
									<li className="flex items-start gap-3">
										<Ban className="h-4 w-4 mt-1 text-destructive flex-shrink-0" />
										<span className="text-muted-foreground">Don't use camera emulators or video manipulation software</span>
									</li>
								</ul>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<div className="flex items-center gap-4 mb-4">
									<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-orange-500">
										<Ban className="h-6 w-6" />
									</div>
									<CardTitle className="text-2xl">4. No Spam or Advertising</CardTitle>
								</div>
							</CardHeader>
							<CardContent>
								<p className="font-semibold text-sm text-muted-foreground uppercase mb-4">It is forbidden to:</p>
								<ul className="space-y-3">
									<li className="flex items-start gap-3">
										<Ban className="h-4 w-4 mt-1 text-destructive flex-shrink-0" />
										<span className="text-muted-foreground">No promotional content or advertisements</span>
									</li>
									<li className="flex items-start gap-3">
										<Ban className="h-4 w-4 mt-1 text-destructive flex-shrink-0" />
										<span className="text-muted-foreground">Don't share links to websites, social media, or videos</span>
									</li>
									<li className="flex items-start gap-3">
										<Ban className="h-4 w-4 mt-1 text-destructive flex-shrink-0" />
										<span className="text-muted-foreground">No repetitive messages to multiple users</span>
									</li>
									<li className="flex items-start gap-3">
										<Ban className="h-4 w-4 mt-1 text-destructive flex-shrink-0" />
										<span className="text-muted-foreground">Don't ask others to like, subscribe, or visit external sites</span>
									</li>
								</ul>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<div className="flex items-center gap-4 mb-4">
									<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-indigo-500">
										<Volume2 className="h-6 w-6" />
									</div>
									<CardTitle className="text-2xl">5. Proper Microphone Usage</CardTitle>
								</div>
							</CardHeader>
							<CardContent>
								<p className="font-semibold text-sm text-muted-foreground uppercase mb-4">It is forbidden to:</p>
								<ul className="space-y-3">
									<li className="flex items-start gap-3">
										<Ban className="h-4 w-4 mt-1 text-destructive flex-shrink-0" />
										<span className="text-muted-foreground">Playing loud music or background noise that disrupts conversation</span>
									</li>
									<li className="flex items-start gap-3">
										<Ban className="h-4 w-4 mt-1 text-destructive flex-shrink-0" />
										<span className="text-muted-foreground">Using voice changers or audio manipulation software</span>
									</li>
									<li className="flex items-start gap-3">
										<Ban className="h-4 w-4 mt-1 text-destructive flex-shrink-0" />
										<span className="text-muted-foreground">Excessive shouting, screaming, or making disturbing sounds</span>
									</li>
									<li className="flex items-start gap-3">
										<Ban className="h-4 w-4 mt-1 text-destructive flex-shrink-0" />
										<span className="text-muted-foreground">Deliberately creating echo or feedback noise</span>
									</li>
									<li className="flex items-start gap-3">
										<Ban className="h-4 w-4 mt-1 text-destructive flex-shrink-0" />
										<span className="text-muted-foreground">Having your microphone unmuted while not speaking for extended periods</span>
									</li>
								</ul>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<div className="flex items-center gap-4 mb-4">
									<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-green-500">
										<MessageSquare className="h-6 w-6" />
									</div>
									<CardTitle className="text-2xl">6. Stay On Topic</CardTitle>
								</div>
							</CardHeader>
							<CardContent>
								<p className="font-semibold text-sm text-muted-foreground uppercase mb-4">It is forbidden to:</p>
								<ul className="space-y-3">
									<li className="flex items-start gap-3">
										<Ban className="h-4 w-4 mt-1 text-destructive flex-shrink-0" />
										<span className="text-muted-foreground">Respect the room's language and topic theme</span>
									</li>
									<li className="flex items-start gap-3">
										<Ban className="h-4 w-4 mt-1 text-destructive flex-shrink-0" />
										<span className="text-muted-foreground">Keep conversations relevant to language practice</span>
									</li>
									<li className="flex items-start gap-3">
										<Ban className="h-4 w-4 mt-1 text-destructive flex-shrink-0" />
										<span className="text-muted-foreground">Allow everyone equal time to speak and practice</span>
									</li>
									<li className="flex items-start gap-3">
										<Ban className="h-4 w-4 mt-1 text-destructive flex-shrink-0" />
										<span className="text-muted-foreground">Help others with corrections kindly</span>
									</li>
									<li className="flex items-start gap-3">
										<Ban className="h-4 w-4 mt-1 text-destructive flex-shrink-0" />
										<span className="text-muted-foreground">Don't dominate the conversation</span>
									</li>
								</ul>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<div className="flex items-center gap-4 mb-4">
									<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-pink-500">
										<Users className="h-6 w-6" />
									</div>
									<CardTitle className="text-2xl">7. Age Requirements</CardTitle>
								</div>
							</CardHeader>
							<CardContent>
								<p className="font-semibold text-sm text-muted-foreground uppercase mb-4">It is forbidden to:</p>
								<ul className="space-y-3">
									<li className="flex items-start gap-3">
										<Ban className="h-4 w-4 mt-1 text-destructive flex-shrink-0" />
										<span className="text-muted-foreground">Users must be adults (18+) according to their country's laws</span>
									</li>
									<li className="flex items-start gap-3">
										<Ban className="h-4 w-4 mt-1 text-destructive flex-shrink-0" />
										<span className="text-muted-foreground">Minors are strictly prohibited, even with parental consent</span>
									</li>
									<li className="flex items-start gap-3">
										<Ban className="h-4 w-4 mt-1 text-destructive flex-shrink-0" />
										<span className="text-muted-foreground">If you encounter a minor, report immediately to moderators</span>
									</li>
								</ul>
							</CardContent>
						</Card>

					</div>
				</div>
			</section>

			<section className="py-16 bg-muted/30">
				<div className="container mx-auto px-4 max-w-5xl">
					<div className="grid md:grid-cols-2 gap-8">
						<Card>
							<CardHeader>
								<Flag className="h-8 w-8 mb-2 text-primary" />
								<CardTitle>Reporting Violations</CardTitle>
								<CardDescription className="text-base space-y-3">
									<p>You can report violations from any participant. Our moderators review every report 24/7 and take appropriate action.</p>
									<p>Users who receive multiple reports in a short time are automatically banned by our system.</p>
									<p className="font-semibold text-foreground">If someone breaks the rules, report them immediately. Don't respond with the same behavior.</p>
								</CardDescription>
							</CardHeader>
						</Card>

						<Card>
							<CardHeader>
								<AlertTriangle className="h-8 w-8 mb-2 text-orange-500" />
								<CardTitle>Important Reminders</CardTitle>
								<CardDescription className="text-base space-y-3">
									<p>
										<strong>Unintentional violations are still violations.</strong>
										{" "}
										Our moderators respond to the act, not the intention.
									</p>
									<p>
										<strong>Brief violations can lead to bans.</strong>
										{" "}
										Duration doesn't matter - be cautious at all times.
									</p>
									<p>
										<strong>You're responsible for your device.</strong>
										{" "}
										Don't let others use your account. Any violation is considered your own.
									</p>
								</CardDescription>
							</CardHeader>
						</Card>
					</div>
				</div>
			</section>

			<section className="py-16">
				<div className="container mx-auto px-4 max-w-5xl">
					<div className="text-center mb-12">
						<Lightbulb className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
						<h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Recommendations</h2>
						<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
							Follow these guidelines for the best experience and to avoid uncomfortable situations
						</p>
					</div>

					<div className="grid md:grid-cols-2 gap-6">

						<Card className="hover:shadow-lg transition-shadow">
							<CardHeader>
								<div className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" />
									<div>
										<CardTitle className="text-lg mb-2">Keep Your Face Visible</CardTitle>
										<CardDescription className="text-sm">Others want to see who they"re talking to. Don"t cover your face and ensure it's clearly visible in the frame.</CardDescription>
									</div>
								</div>
							</CardHeader>
						</Card>

						<Card className="hover:shadow-lg transition-shadow">
							<CardHeader>
								<div className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" />
									<div>
										<CardTitle className="text-lg mb-2">Use Good Lighting</CardTitle>
										<CardDescription className="text-sm">Chat in a well-lit environment. Adjust your camera angle and lighting before starting the conversation.</CardDescription>
									</div>
								</div>
							</CardHeader>
						</Card>

						<Card className="hover:shadow-lg transition-shadow">
							<CardHeader>
								<div className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" />
									<div>
										<CardTitle className="text-lg mb-2">Dress Appropriately</CardTitle>
										<CardDescription className="text-sm">Treat this like a public gathering. Be dressed as you would when meeting people in person.</CardDescription>
									</div>
								</div>
							</CardHeader>
						</Card>

						<Card className="hover:shadow-lg transition-shadow">
							<CardHeader>
								<div className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" />
									<div>
										<CardTitle className="text-lg mb-2">Mind What's On Camera</CardTitle>
										<CardDescription className="text-sm">Be aware of everything in your camera's view. Keep the focus on face-to-face communication.</CardDescription>
									</div>
								</div>
							</CardHeader>
						</Card>

						<Card className="hover:shadow-lg transition-shadow">
							<CardHeader>
								<div className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" />
									<div>
										<CardTitle className="text-lg mb-2">Never Step Away While Connected</CardTitle>
										<CardDescription className="text-sm">Don't leave others staring at empty space. Disconnect if you need to step away.</CardDescription>
									</div>
								</div>
							</CardHeader>
						</Card>

						<Card className="hover:shadow-lg transition-shadow">
							<CardHeader>
								<div className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" />
									<div>
										<CardTitle className="text-lg mb-2">Think Before You Act</CardTitle>
										<CardDescription className="text-sm">If someone asks you to do something, consider if it violates the rules before responding.</CardDescription>
									</div>
								</div>
							</CardHeader>
						</Card>

						<Card className="hover:shadow-lg transition-shadow">
							<CardHeader>
								<div className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" />
									<div>
										<CardTitle className="text-lg mb-2">Report, Don't Retaliate</CardTitle>
										<CardDescription className="text-sm">If someone breaks the rules, report them. Don't respond with the same misconduct.</CardDescription>
									</div>
								</div>
							</CardHeader>
						</Card>

						<Card className="hover:shadow-lg transition-shadow">
							<CardHeader>
								<div className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" />
									<div>
										<CardTitle className="text-lg mb-2">Protect Your Privacy</CardTitle>
										<CardDescription className="text-sm">Be cautious about sharing personal information. Think carefully about meeting people in person.</CardDescription>
									</div>
								</div>
							</CardHeader>
						</Card>

					</div>
				</div>
			</section>

			<section className="py-16 bg-primary text-primary-foreground">
				<div className="container mx-auto px-4 text-center max-w-3xl">
					<Shield className="h-16 w-16 mx-auto mb-6" />
					<h2 className="text-3xl font-bold mb-4">Practice Safely & Respectfully</h2>
					<p className="text-lg mb-8 opacity-90">
						These rules help create a safe, welcoming environment where everyone can practice languages comfortably.
						Thank you for being part of our community!
					</p>
					<Card className="bg-primary-foreground text-primary">
						<CardHeader>
							<CardDescription className="text-primary text-sm">
								<strong>Policy Updates:</strong>
								{" "}
								We reserve the right to update these rules at any time.
								Please review them regularly. By using our service, you agree to the current rules.
							</CardDescription>
						</CardHeader>
					</Card>
				</div>
			</section>
		</div>
	);
};

export const Route = createFileRoute("/_public/rules")({
	component: Rules
});
