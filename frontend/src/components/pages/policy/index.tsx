import { Lock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const PolicyPage = () => {
	return (
		<Card className="grid min-h-[calc(100dvh-var(--header-height)-var(--header-margin-bottom)-var(--header-margin-bottom))]">
			<CardContent className="max-w-4xl mx-auto w-full p-6 space-y-8">
				<aside className="flex flex-wrap gap-2 max-md:justify-center">
					<Badge variant="secondary" className="gap-2">
						<Lock className="size-4" aria-hidden="true" />
						<span>Your Data & Rights</span>
					</Badge>
				</aside>
				<h1 className="mb-4 max-md:text-center">
					Privacy Policy
				</h1>
				<p className="mb-4 max-md:text-center">
					We take your privacy seriously. This policy explains how we collect, use, and protect your personal information when you use our language practice platform.
				</p>
				<p className="max-md:text-center mb-8">
					By using our service, you agree to this Privacy Policy. We may update it from time to time; please check this page for the latest version.
				</p>

				<div className="space-y-8">
					<article className="space-y-3">
						<h2>1. Data We Collect</h2>
						<p>
							We collect information necessary to provide and improve our service:
						</p>
						<ul className="space-y-2">
							<li className="flex items-start gap-2">
								<span>Account information (email, name, profile picture when you sign in with a provider)</span>
							</li>
							<li className="flex items-start gap-2">
								<span>Usage data (rooms joined, session duration, language preferences)</span>
							</li>
							<li className="flex items-start gap-2">
								<span>Technical data (IP address, device type, browser) for security and stability</span>
							</li>
							<li className="flex items-start gap-2">
								<span>Reports and moderation-related data when you report violations</span>
							</li>
						</ul>
					</article>

					<article className="space-y-3">
						<h2>2. How We Use Your Data</h2>
						<p>
							We use your data to:
						</p>
						<ul className="space-y-2">
							<li className="flex items-start gap-2">
								<span>Provide and maintain the service (matching you with rooms, displaying your profile)</span>
							</li>
							<li className="flex items-start gap-2">
								<span>Enforce our Rules and keep the platform safe (moderation, bans)</span>
							</li>
							<li className="flex items-start gap-2">
								<span>Improve the product (analytics, bug fixes, new features)</span>
							</li>
							<li className="flex items-start gap-2">
								<span>Communicate with you (important updates, security notices)</span>
							</li>
						</ul>
					</article>

					<article className="space-y-3">
						<h2>3. Data Sharing</h2>
						<p>
							We do not sell your personal data. We may share data only in these cases:
						</p>
						<ul className="space-y-2">
							<li className="flex items-start gap-2">
								<span>With other users as necessary (e.g. your display name and avatar in a room)</span>
							</li>
							<li className="flex items-start gap-2">
								<span>With service providers that help us run the platform (hosting, auth) under strict agreements</span>
							</li>
							<li className="flex items-start gap-2">
								<span>When required by law or to protect our rights and safety</span>
							</li>
						</ul>
					</article>

					<article className="space-y-3">
						<h2>4. Cookies & Storage</h2>
						<p>
							We use cookies and similar technologies to:
						</p>
						<ul className="space-y-2">
							<li className="flex items-start gap-2">
								<span>Keep you signed in and remember your preferences</span>
							</li>
							<li className="flex items-start gap-2">
								<span>Understand how the service is used (analytics) to improve it</span>
							</li>
							<li className="flex items-start gap-2">
								<span>Ensure security and prevent abuse</span>
							</li>
						</ul>
					</article>

					<article className="space-y-3">
						<h2>5. Your Rights</h2>
						<p>
							Depending on where you live, you may have the right to:
						</p>
						<ul className="space-y-2">
							<li className="flex items-start gap-2">
								<span>Access and receive a copy of your personal data</span>
							</li>
							<li className="flex items-start gap-2">
								<span>Correct or update inaccurate data</span>
							</li>
							<li className="flex items-start gap-2">
								<span>Request deletion of your data (subject to legal and operational requirements)</span>
							</li>
							<li className="flex items-start gap-2">
								<span>Object to or restrict certain processing</span>
							</li>
							<li className="flex items-start gap-2">
								<span>Data portability where applicable</span>
							</li>
						</ul>
						<p>
							To exercise these rights, contact us using the details below.
						</p>
					</article>

					<article className="space-y-3">
						<h2>6. Contact Us</h2>
						<p>
							For privacy-related questions, requests, or complaints, please contact us at the email address provided in the app or on our website. We will respond within a reasonable time.
						</p>
					</article>
				</div>

				<Separator />

				<p className="items-start">
					<strong>Policy Updates:</strong>
					{" "}
					We may update this Privacy Policy from time to time. We will notify you of significant changes via the service or by email. Continued use after changes means you accept the updated policy.
				</p>
			</CardContent>
		</Card>
	);
};

export default PolicyPage;
