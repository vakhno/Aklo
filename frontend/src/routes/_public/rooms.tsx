import { createFileRoute } from "@tanstack/react-router";

import ConversationPage from "@/components/pages/conversation";

export const Route = createFileRoute("/_public/rooms")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{ title: "Language Roulettes & Topic Rooms" },
			{ name: "description", content: "Browse video chat roulettes and themed conversation rooms. Find language partners, join discussions on topics you love, or create your own room. Start practicing now!" },
			{ name: "keywords", content: "language roulette, video chat rooms, conversation practice, language exchange rooms, topic discussions, practice speaking, find language partners, video conversation" },
			{ name: "robots", content: "index, follow" },
			{ name: "author", content: "Aklo" },
			{ property: "og:type", content: "website" },
			{ property: "og:title", content: "Language Roulettes & Topic Rooms" },
			{ property: "og:description", content: "Browse video chat roulettes and themed conversation rooms. Find language partners and start practicing now!" },
			{ property: "og:site_name", content: "Aklo" },
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:title", content: "Language Roulettes & Topic Rooms" },
			{ name: "twitter:description", content: "Browse video chat roulettes and themed conversation rooms. Find language partners and start practicing!" }
		],
		links: [
			{ rel: "canonical", href: `${import.meta.env.VITE_APP_URL}/rooms` }
		],
		scripts: [
			{
				type: "application/ld+json",
				children: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "CollectionPage",
					"name": "Language Roulettes & Topic Rooms",
					"description": "Browse and join video chat roulettes for instant language matching or themed conversation rooms for topic-based discussions.",
					"isPartOf": {
						"@type": "WebApplication",
						"name": "Aklo"
					},
					"mainEntity": {
						"@type": "ItemList",
						"name": "Practice Options",
						"itemListElement": [
							{
								"@type": "ListItem",
								"position": 1,
								"name": "Language Roulettes",
								"description": "Get matched instantly with random language partners for spontaneous conversation practice"
							},
							{
								"@type": "ListItem",
								"position": 2,
								"name": "Topic Rooms",
								"description": "Join or create topic-based video rooms to practice while discussing subjects you enjoy"
							}
						]
					}
				})
			}
		]
	})
});

function RouteComponent() {
	return <ConversationPage />;
}
