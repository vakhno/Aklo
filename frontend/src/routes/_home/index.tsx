import { createFileRoute } from "@tanstack/react-router";

import HomePage from "@/components/pages/home";

export const Route = createFileRoute("/_home/")({
	component: Home,
	head: () => ({
		meta: [
			{ title: "Aklo - Home" },
			{ name: "description", content: "Overcome speaking fear by practicing your foreign language with fellow learners. Join video chat roulettes or themed conversation rooms. 10+ languages, stress-free practice." },
			{ name: "keywords", content: "language practice, language learning, video chat, language exchange, speak foreign languages, conversation practice, language roulette, practice with learners, overcome speaking anxiety" },
			{ name: "robots", content: "index, follow" },
			{ name: "author", content: "Aklo" },
			{ property: "og:type", content: "website" },
			{ property: "og:title", content: "Aklo - Practice Your Foreign Language with Fellow Learners" },
			{ property: "og:description", content: "Overcome speaking fear by practicing with fellow learners. Video chat roulettes & themed conversation rooms. 10+ languages." },
			{ property: "og:site_name", content: "Aklo" },
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:title", content: "Aklo - Practice Your Foreign Language with Fellow Learners" },
			{ name: "twitter:description", content: "Overcome speaking fear by practicing with fellow learners. Video chat roulettes & themed rooms." }
		],
		links: [
			{ rel: "canonical", href: import.meta.env.VITE_APP_URL }
		],
		scripts: [
			{
				type: "application/ld+json",
				children: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "WebApplication",
					"name": "Aklo",
					"description": "Practice your foreign language with fellow learners through video chat roulettes and themed conversation rooms.",
					"applicationCategory": ["EducationalApplication", "SocialNetworkingApplication"],
					"operatingSystem": "Web Browser",
					"featureList": [
						"Video chat roulette for language practice",
						"Themed video rooms for topic-based conversations",
						"Practice with fellow language learners",
						"Overcome speaking anxiety in a supportive environment",
						"10+ languages supported"
					]
				})
			}
		]
	})
});

function Home() {
	return (
		<HomePage />
	);
}
