import { Shield } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const RulesPage = () => {
	return (
		<Card className="grid min-h-[calc(100dvh-var(--header-height)-var(--header-margin-bottom)-var(--header-margin-bottom))]">
			<CardContent className="max-w-4xl mx-auto w-full p-6 space-y-8">
				<aside className="flex flex-wrap gap-2 max-md:justify-center">
					<Badge variant="secondary" className="gap-2">
						<Shield className="size-4" aria-hidden="true" />
						<span>Community Guidelines</span>
					</Badge>
				</aside>
				<h1 className="mb-4 max-md:text-center">
					Rules & Regulations
				</h1>
				<p className="mb-4 max-md:text-center">
					We provide a safe platform for language learners to connect and practice together. These simple rules ensure a respectful and enjoyable experience for everyone.
				</p>
				<p className="max-md:text-center mb-8">
					By using our language rooms, you agree to follow these rules. Violations may result in warnings or permanent bans from the platform.
				</p>
				<div className="space-y-8">
					<article className="space-y-3">
						<h2>1. Be Respectful & Kind</h2>
						<ul className="space-y-2">
							<li className="flex items-start gap-2">
								<span>Use polite and friendly language at all times</span>
							</li>
							<li className="flex items-start gap-2">
								<span>Avoid insulting, mocking, or being rude to other participants</span>
							</li>
							<li className="flex items-start gap-2">
								<span>No offensive gestures or expressions</span>
							</li>
							<li className="flex items-start gap-2">
								<span>No discrimination based on race, religion, nationality, gender, age, or appearance</span>
							</li>
							<li className="flex items-start gap-2">
								<span>No threats or intimidating behavior of any kind</span>
							</li>
						</ul>
					</article>

					<article className="space-y-3">
						<h2>2. Keep It Appropriate</h2>
						<ul className="space-y-2">
							<li className="flex items-start gap-2">
								<span>Dress appropriately as if in a public space</span>
							</li>
							<li className="flex items-start gap-2">
								<span>Keep your camera focused on your face</span>
							</li>
							<li className="flex items-start gap-2">
								<span>No inappropriate content, gestures, or suggestions</span>
							</li>
							<li className="flex items-start gap-2">
								<span>Maintain a family-friendly environment</span>
							</li>
							<li className="flex items-start gap-2">
								<span>No romantic or dating solicitations</span>
							</li>
						</ul>
					</article>

					<article className="space-y-3">
						<h2>3. Proper Camera Usage</h2>
						<ul className="space-y-2">
							<li className="flex items-start gap-2">
								<span>Show your face clearly - people want to see who they're talking to</span>
							</li>
							<li className="flex items-start gap-2">
								<span>Ensure good lighting so others can see you properly</span>
							</li>
							<li className="flex items-start gap-2">
								<span>Don't point camera at screens (TV, computer, phone, etc.)</span>
							</li>
							<li className="flex items-start gap-2">
								<span>Avoid showing photos, drawings, or text signs</span>
							</li>
							<li className="flex items-start gap-2">
								<span>No camera filters, masks, or virtual backgrounds</span>
							</li>
							<li className="flex items-start gap-2">
								<span>Don't use camera emulators or video manipulation software</span>
							</li>
						</ul>
					</article>

					<article className="space-y-3">
						<h2>4. No Spam or Advertising</h2>
						<ul className="space-y-2">
							<li className="flex items-start gap-2">
								<span>No promotional content or advertisements</span>
							</li>
							<li className="flex items-start gap-2">
								<span>Don't share links to websites, social media, or videos</span>
							</li>
							<li className="flex items-start gap-2">
								<span>No repetitive messages to multiple users</span>
							</li>
							<li className="flex items-start gap-2">
								<span>Don't ask others to like, subscribe, or visit external sites</span>
							</li>
						</ul>
					</article>

					<article className="space-y-3">
						<h2>5. Proper Microphone Usage</h2>
						<ul className="space-y-2">
							<li className="flex items-start gap-2">
								<span>Playing loud music or background noise that disrupts conversation</span>
							</li>
							<li className="flex items-start gap-2">
								<span>Using voice changers or audio manipulation software</span>
							</li>
							<li className="flex items-start gap-2">
								<span>Excessive shouting, screaming, or making disturbing sounds</span>
							</li>
							<li className="flex items-start gap-2">
								<span>Deliberately creating echo or feedback noise</span>
							</li>
							<li className="flex items-start gap-2">
								<span>Having your microphone unmuted while not speaking for extended periods</span>
							</li>
						</ul>
					</article>

					<article className="space-y-3">
						<h2>6. Stay On Topic</h2>
						<ul className="space-y-2">
							<li className="flex items-start gap-2">
								<span>Respect the room's language and topic theme</span>
							</li>
							<li className="flex items-start gap-2">
								<span>Keep conversations relevant to language practice</span>
							</li>
							<li className="flex items-start gap-2">
								<span>Allow everyone equal time to speak and practice</span>
							</li>
							<li className="flex items-start gap-2">
								<span>Help others with corrections kindly</span>
							</li>
							<li className="flex items-start gap-2">
								<span>Don't dominate the conversation</span>
							</li>
						</ul>
					</article>

					<article className="space-y-3">
						<h2>7. Age Requirements</h2>
						<ul className="space-y-2">
							<li className="flex items-start gap-2">
								<span>Users must be adults (18+) according to their country's laws</span>
							</li>
							<li className="flex items-start gap-2">
								<span>Minors are strictly prohibited, even with parental consent</span>
							</li>
							<li className="flex items-start gap-2">
								<span>If you encounter a minor, report immediately to moderators</span>
							</li>
						</ul>
					</article>
				</div>

				<Separator />

				<div className="space-y-6 pt-6">
					<h3>Our Recommendations</h3>
					<p>
						Follow these guidelines for the best experience and to avoid uncomfortable situations.
					</p>
					<ul className="grid md:grid-cols-2 gap-4">
						<li className="flex items-start gap-2">
							<span>
								<strong>Keep Your Face Visible.</strong>
								{" "}
								Others want to see who they're talking to. Don't cover your face and ensure it's clearly visible in the frame.
							</span>
						</li>
						<li className="flex items-start gap-2">
							<span>
								<strong>Use Good Lighting.</strong>
								{" "}
								Chat in a well-lit environment. Adjust your camera angle and lighting before starting the conversation.
							</span>
						</li>
						<li className="flex items-start gap-2">
							<span>
								<strong>Dress Appropriately.</strong>
								{" "}
								Treat this like a public gathering. Be dressed as you would when meeting people in person.
							</span>
						</li>
						<li className="flex items-start gap-2">
							<span>
								<strong>Mind What's On Camera.</strong>
								{" "}
								Be aware of everything in your camera's view. Keep the focus on face-to-face communication.
							</span>
						</li>
						<li className="flex items-start gap-2">
							<span>
								<strong>Never Step Away While Connected.</strong>
								{" "}
								Don't leave others staring at empty space. Disconnect if you need to step away.
							</span>
						</li>
						<li className="flex items-start gap-2">
							<span>
								<strong>Think Before You Act.</strong>
								{" "}
								If someone asks you to do something, consider if it violates the rules before responding.
							</span>
						</li>
						<li className="flex items-start gap-2">
							<span>
								<strong>Report, Don't Retaliate.</strong>
								{" "}
								If someone breaks the rules, report them. Don't respond with the same misconduct.
							</span>
						</li>
						<li className="flex items-start gap-2">
							<span>
								<strong>Protect Your Privacy.</strong>
								{" "}
								Be cautious about sharing personal information. Think carefully about meeting people in person.
							</span>
						</li>
					</ul>
				</div>
				<Separator />
				<p>
					<strong>Policy Updates:</strong>
					{" "}
					We reserve the right to update these rules at any time. Please review them regularly. By using our service, you agree to the current rules.
				</p>
			</CardContent>
		</Card>
	);
};

export default RulesPage;
