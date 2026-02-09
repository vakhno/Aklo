import { FileText } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const TermsPage = () => {
	return (
		<Card className="grid min-h-[calc(100dvh-var(--header-height)-var(--header-margin-bottom)-var(--header-margin-bottom))]">
			<CardContent className="max-w-4xl mx-auto w-full p-6 space-y-8">
				<aside className="flex flex-wrap gap-2 max-md:justify-center">
					<Badge variant="secondary" className="gap-2">
						<FileText className="size-4" aria-hidden="true" />
						<span>Legal Agreement</span>
					</Badge>
				</aside>
				<h1 className="mb-4 max-md:text-center">
					Terms of Service
				</h1>
				<p className="mb-4 max-md:text-center">
					By using our language practice platform, you agree to these terms. Please read them carefully before using the service.
				</p>
				<p className="max-md:text-center mb-8">
					By accessing or using our service, you agree to be bound by these Terms of Service. If you do not agree, please do not use the service.
				</p>

				<div className="space-y-8">
					<article className="space-y-3">
						<h2>1. Acceptance of Terms</h2>
						<p>
							By creating an account or using our service, you agree to these Terms of Service, our Rules & Regulations, and our Privacy Policy. You must be at least 18 years old (or the age of majority in your jurisdiction) to use the service.
						</p>
					</article>

					<article className="space-y-3">
						<h2>2. Your Account</h2>
						<p>
							You are responsible for:
						</p>
						<ul className="space-y-2">
							<li className="flex items-start gap-2">
								<span>Keeping your account credentials secure</span>
							</li>
							<li className="flex items-start gap-2">
								<span>All activity that occurs under your account</span>
							</li>
							<li className="flex items-start gap-2">
								<span>Providing accurate information when signing up</span>
							</li>
						</ul>
						<p>
							We may suspend or terminate your account if you violate these terms or our Rules.
						</p>
					</article>

					<article className="space-y-3">
						<h2>3. Use of the Service</h2>
						<p>
							You agree to use the service only for lawful purposes and in accordance with our Rules. You must not:
						</p>
						<ul className="space-y-2">
							<li className="flex items-start gap-2">
								<span>Violate any applicable laws or regulations</span>
							</li>
							<li className="flex items-start gap-2">
								<span>Infringe on others' intellectual property or rights</span>
							</li>
							<li className="flex items-start gap-2">
								<span>Attempt to gain unauthorized access to our systems or other users' accounts</span>
							</li>
							<li className="flex items-start gap-2">
								<span>Use the service to harass, abuse, or harm others</span>
							</li>
							<li className="flex items-start gap-2">
								<span>Resell, sublicense, or commercially exploit the service without our permission</span>
							</li>
						</ul>
					</article>

					<article className="space-y-3">
						<h2>4. Intellectual Property</h2>
						<p>
							The service, including its design, branding, software, and content (excluding user-generated content), is owned by us or our licensors. You may not copy, modify, distribute, or create derivative works without our written permission. You retain ownership of content you create; by using the service, you grant us a limited license to use, display, and process that content as needed to provide the service.
						</p>
					</article>

					<article className="space-y-3">
						<h2>5. Limitation of Liability</h2>
						<p>
							The service is provided "as is" and "as available." To the fullest extent permitted by law, we disclaim all warranties, express or implied. We are not liable for any indirect, incidental, special, consequential, or punitive damages, or for loss of data, profits, or goodwill, arising from your use of the service or your inability to use it. Our total liability shall not exceed the amount you paid us (if any) in the twelve months before the claim.
						</p>
					</article>

					<article className="space-y-3">
						<h2>6. Termination</h2>
						<p>
							We may suspend or terminate your access to the service at any time, with or without notice, for any reason, including violation of these terms or our Rules. You may stop using the service at any time. Upon termination, your right to use the service ceases. Provisions that by their nature should survive (e.g. liability, intellectual property) will survive termination.
						</p>
					</article>

					<article className="space-y-3">
						<h2>7. Governing Law</h2>
						<p>
							These terms are governed by the laws of the jurisdiction in which we operate, without regard to conflict of law principles. Any disputes shall be resolved in the courts of that jurisdiction, except where prohibited by law.
						</p>
					</article>

					<article className="space-y-3">
						<h2>8. Contact Us</h2>
						<p>
							For questions about these Terms of Service, please contact us at the email address provided in the app or on our website.
						</p>
					</article>
				</div>
				<Separator />
				<p>
					<strong>Terms Updates:</strong>
					{" "}
					We may update these Terms of Service at any time. We will notify you of significant changes via the service or by email. Continued use after changes means you accept the updated terms.
				</p>
			</CardContent>
		</Card>
	);
};

export default TermsPage;
