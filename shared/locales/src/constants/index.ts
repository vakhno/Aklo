export const LOCALES_LIST = ["en"] as const;
export const DEFAULT_LOCALE = "en" as (typeof LOCALES_LIST)[number];

const SITE_NAME = "Aklo";
const DEFAULT_OG_TYPE = "website";
const DEFAULT_TWITTER_CARD = "summary_large_image";
const DEFAULT_VIEWPORT = "width=device-width, initial-scale=1.0";
const DEFAULT_OG_LOCALE = "en_US";
const DEFAULT_OG_IMAGE = "";
const DEFAULT_OG_IMAGE_WIDTH = "";
const DEFAULT_OG_IMAGE_HEIGHT = "";
const DEFAULT_OG_IMAGE_ALT = "";
const DEFAULT_TWITTER_SITE = "";
const DEFAULT_TWITTER_IMAGE = "";
const DEFAULT_TWITTER_IMAGE_WIDTH = "";
const DEFAULT_TWITTER_IMAGE_HEIGHT = "";
const DEFAULT_THEME_COLOR = "#ffdd00";

export const DICTIONARY = {
	en: {
		toast: {
			error: {
				socialAuthentication: {
					heading: "Authentication failed",
					description: "There was an error signing in with Google. Please try again.",
				},
			},
		},
		seo: {
			defaults: {
				themeColor: DEFAULT_THEME_COLOR,
				viewport: DEFAULT_VIEWPORT,
				ogLocale: DEFAULT_OG_LOCALE,
				ogImage: DEFAULT_OG_IMAGE,
				ogImageWidth: DEFAULT_OG_IMAGE_WIDTH,
				ogImageHeight: DEFAULT_OG_IMAGE_HEIGHT,
				ogImageAlt: DEFAULT_OG_IMAGE_ALT,
				twitterSite: DEFAULT_TWITTER_SITE,
				twitterImage: DEFAULT_TWITTER_IMAGE,
				twitterImageWidth: DEFAULT_TWITTER_IMAGE_WIDTH,
				twitterImageHeight: DEFAULT_TWITTER_IMAGE_HEIGHT,
			},
			routes: {
				home: {
					title: `${SITE_NAME} - Home`,
					description:
						"Overcome speaking fear by practicing your foreign language with fellow learners. Join video chat roulettes or themed conversation rooms. 10+ languages, stress-free practice.",
					keywords:
						"language practice, language learning, video chat, language exchange, speak foreign languages, conversation practice, language roulette, practice with learners, overcome speaking anxiety",
					robots: "index, follow",
					author: SITE_NAME,
					ogType: DEFAULT_OG_TYPE,
					ogTitle: `${SITE_NAME} - Practice Your Foreign Language with Fellow Learners`,
					ogDescription:
						"Overcome speaking fear by practicing with fellow learners. Video chat roulettes & themed conversation rooms. 10+ languages.",
					ogSiteName: SITE_NAME,
					twitterCard: DEFAULT_TWITTER_CARD,
					twitterTitle: `${SITE_NAME} - Practice Your Foreign Language with Fellow Learners`,
					twitterDescription: "Overcome speaking fear by practicing with fellow learners. Video chat roulettes & themed rooms.",
					jsonLd: {
						"@context": "https://schema.org",
						"@type": "WebApplication",
						name: SITE_NAME,
						description:
							"Practice your foreign language with fellow learners through video chat roulettes and themed conversation rooms.",
						applicationCategory: ["EducationalApplication", "SocialNetworkingApplication"],
						operatingSystem: "Web Browser",
						featureList: [
							"Video chat roulette for language practice",
							"Themed video rooms for topic-based conversations",
							"Practice with fellow language learners",
							"Overcome speaking anxiety in a supportive environment",
							"10+ languages supported",
						],
					},
				},
				rooms: {
					title: "Language Roulettes & Topic Rooms",
					description:
						"Browse video chat roulettes and themed conversation rooms. Find language partners, join discussions on topics you love, or create your own room. Start practicing now!",
					keywords:
						"language roulette, video chat rooms, conversation practice, language exchange rooms, topic discussions, practice speaking, find language partners, video conversation",
					robots: "index, follow",
					author: SITE_NAME,
					ogType: DEFAULT_OG_TYPE,
					ogTitle: "Language Roulettes & Topic Rooms",
					ogDescription:
						"Browse video chat roulettes and themed conversation rooms. Find language partners and start practicing now!",
					ogSiteName: SITE_NAME,
					twitterCard: DEFAULT_TWITTER_CARD,
					twitterTitle: "Language Roulettes & Topic Rooms",
					twitterDescription:
						"Browse video chat roulettes and themed conversation rooms. Find language partners and start practicing!",
					jsonLd: {
						"@context": "https://schema.org",
						"@type": "CollectionPage",
						name: "Language Roulettes & Topic Rooms",
						description:
							"Browse and join video chat roulettes for instant language matching or themed conversation rooms for topic-based discussions.",
						isPartOf: {
							"@type": "WebApplication",
							name: SITE_NAME,
						},
						mainEntity: {
							"@type": "ItemList",
							name: "Practice Options",
							itemListElement: [
								{
									"@type": "ListItem",
									position: 1,
									name: "Language Roulettes",
									description:
										"Get matched instantly with random language partners for spontaneous conversation practice",
								},
								{
									"@type": "ListItem",
									position: 2,
									name: "Topic Rooms",
									description:
										"Join or create topic-based video rooms to practice while discussing subjects you enjoy",
								},
							],
						},
					},
				},
				policy: {
					title: `${SITE_NAME} - Privacy`,
					description:
						"Read Aklo's privacy policy: how we collect, use, and protect your data when you practice languages on our platform.",
					keywords: "Aklo, privacy policy, data protection, language learning",
					robots: "index, follow",
					author: SITE_NAME,
					ogType: DEFAULT_OG_TYPE,
					ogTitle: `${SITE_NAME} - Privacy Policy`,
					ogDescription: "How Aklo handles your personal information and privacy.",
					ogSiteName: SITE_NAME,
					twitterCard: DEFAULT_TWITTER_CARD,
					twitterTitle: `${SITE_NAME} - Privacy Policy`,
					twitterDescription: "How Aklo handles your personal information and privacy.",
					jsonLd: {},
				},
				terms: {
					title: `${SITE_NAME} - Terms`,
					description:
						"Aklo terms of service governing use of video chat roulettes, topic rooms, and related features.",
					keywords: "Aklo, terms of service, user agreement",
					robots: "index, follow",
					author: SITE_NAME,
					ogType: DEFAULT_OG_TYPE,
					ogTitle: `${SITE_NAME} - Terms of Service`,
					ogDescription: "Terms of service for using Aklo.",
					ogSiteName: SITE_NAME,
					twitterCard: DEFAULT_TWITTER_CARD,
					twitterTitle: `${SITE_NAME} - Terms of Service`,
					twitterDescription: "Terms of service for using Aklo.",
					jsonLd: {},
				},
				rules: {
					title: `${SITE_NAME} - Rules`,
					description:
						"Community rules and guidelines for respectful, safe language practice on Aklo — roulettes, rooms, and video chat.",
					keywords: "Aklo, community guidelines, chat rules, language exchange",
					robots: "index, follow",
					author: SITE_NAME,
					ogType: DEFAULT_OG_TYPE,
					ogTitle: `${SITE_NAME} - Community Rules`,
					ogDescription: "Community rules for language practice on Aklo.",
					ogSiteName: SITE_NAME,
					twitterCard: DEFAULT_TWITTER_CARD,
					twitterTitle: `${SITE_NAME} - Community Rules`,
					twitterDescription: "Community rules for language practice on Aklo.",
					jsonLd: {},
				},
				login: {
					title: `${SITE_NAME} - Login`,
					description: "Sign in to Aklo to join language roulettes, topic rooms, and practice with fellow learners.",
					keywords: "Aklo, login, sign in, language practice",
					robots: "noindex, nofollow",
					author: SITE_NAME,
					ogType: DEFAULT_OG_TYPE,
					ogTitle: `${SITE_NAME} - Login`,
					ogDescription: "Sign in to practice languages with fellow learners on Aklo.",
					ogSiteName: SITE_NAME,
					twitterCard: DEFAULT_TWITTER_CARD,
					twitterTitle: `${SITE_NAME} - Login`,
					twitterDescription: "Sign in to practice languages with fellow learners on Aklo.",
					jsonLd: {},
				},
				profile: {
					title: `${SITE_NAME} - Profile`,
					description: "Manage your Aklo profile and account settings.",
					keywords: "Aklo, profile, account",
					robots: "noindex, nofollow",
					author: SITE_NAME,
					ogType: DEFAULT_OG_TYPE,
					ogTitle: `${SITE_NAME} - Profile`,
					ogDescription: "Your Aklo profile and settings.",
					ogSiteName: SITE_NAME,
					twitterCard: DEFAULT_TWITTER_CARD,
					twitterTitle: `${SITE_NAME} - Profile`,
					twitterDescription: "Your Aklo profile and settings.",
					jsonLd: {},
				},
				dashboard: {
					title: `${SITE_NAME} - Dashboard`,
					description: "Aklo admin dashboard for managing languages, rooms, roulettes, and users.",
					keywords: "Aklo, admin, dashboard",
					robots: "noindex, nofollow",
					author: SITE_NAME,
					ogType: DEFAULT_OG_TYPE,
					ogTitle: `${SITE_NAME} - Admin Dashboard`,
					ogDescription: "Admin tools for managing Aklo content and users.",
					ogSiteName: SITE_NAME,
					twitterCard: DEFAULT_TWITTER_CARD,
					twitterTitle: `${SITE_NAME} - Admin Dashboard`,
					twitterDescription: "Admin tools for managing Aklo content and users.",
					jsonLd: {},
				},
				room: {
					title: `${SITE_NAME} - Topic room`,
					description:
						"Join a themed video conversation room on Aklo and practice your target language with other learners.",
					keywords: "Aklo, topic room, video chat, language practice",
					robots: "noindex, nofollow",
					author: SITE_NAME,
					ogType: DEFAULT_OG_TYPE,
					ogTitle: `${SITE_NAME} - Topic room`,
					ogDescription: "Video topic room for language practice on Aklo.",
					ogSiteName: SITE_NAME,
					twitterCard: DEFAULT_TWITTER_CARD,
					twitterTitle: `${SITE_NAME} - Topic room`,
					twitterDescription: "Video topic room for language practice on Aklo.",
					jsonLd: {},
				},
				roulette: {
					title: `${SITE_NAME} - Language roulette`,
					description:
						"Practice speaking in Aklo language roulette — get matched with a partner for spontaneous video conversation.",
					keywords: "Aklo, language roulette, video chat, conversation practice",
					robots: "noindex, nofollow",
					author: SITE_NAME,
					ogType: DEFAULT_OG_TYPE,
					ogTitle: `${SITE_NAME} - Language roulette`,
					ogDescription: "Random-match video roulette for language practice on Aklo.",
					ogSiteName: SITE_NAME,
					twitterCard: DEFAULT_TWITTER_CARD,
					twitterTitle: `${SITE_NAME} - Language roulette`,
					twitterDescription: "Random-match video roulette for language practice on Aklo.",
					jsonLd: {},
				},
			},
		},
	},
} as const satisfies Record<typeof LOCALES_LIST[number], Record<string, unknown>>;

