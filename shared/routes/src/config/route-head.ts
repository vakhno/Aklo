/** Rich head configs for HOME and ROOMS - require baseUrl for canonical links */

import { HOME_TITLE, ROOMS_TITLE } from "./meta";
import { HOME, ROOMS } from "./paths";

export interface HeadConfig {
	meta: Array<{ title?: string; name?: string; property?: string; content?: string }>;
	links?: Array<{ rel?: string; href?: string }>;
	scripts?: Array<{ type?: string; children?: string }>;
}

const HOME_META = [
	{ title: HOME_TITLE },
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
] as const;

const ROOMS_META = [
	{ title: ROOMS_TITLE },
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
] as const;

const HOME_LD_JSON = {
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
};

const ROOMS_LD_JSON = {
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
};

/** Get full head config for HOME route. Pass baseUrl (e.g. import.meta.env.VITE_APP_URL) */
export function getHomeHead(baseUrl: string): HeadConfig {
	const base = baseUrl.replace(/\/$/, "");
	return {
		meta: [...HOME_META],
		links: [{ rel: "canonical", href: base || baseUrl || "/" }],
		scripts: [{ type: "application/ld+json", children: JSON.stringify(HOME_LD_JSON) }]
	};
}

/** Get full head config for ROOMS route. Pass baseUrl (e.g. import.meta.env.VITE_APP_URL) */
export function getRoomsHead(baseUrl: string): HeadConfig {
	const base = baseUrl.replace(/\/$/, "");
	return {
		meta: [...ROOMS_META],
		links: [{ rel: "canonical", href: `${base}${ROOMS}` }],
		scripts: [{ type: "application/ld+json", children: JSON.stringify(ROOMS_LD_JSON) }]
	};
}
