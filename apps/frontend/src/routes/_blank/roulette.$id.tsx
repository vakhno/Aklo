import { DEFAULT_LOCALE, DICTIONARY } from "@shared/locales";
import { ROUTES } from "@shared/routes/constants";
import { createFileRoute } from "@tanstack/react-router";

import RoulettePage from "@/pages/roulette";

export const Route = createFileRoute("/_blank/roulette/$id")({
	component: Roulette,
	head: ({ params }) => {
		return ({
			meta: [
				{ title: DICTIONARY[DEFAULT_LOCALE].seo.routes.roulette.title },
				{ name: "description", content: DICTIONARY[DEFAULT_LOCALE].seo.routes.roulette.description },
				{ name: "keywords", content: DICTIONARY[DEFAULT_LOCALE].seo.routes.roulette.keywords },
				{ name: "robots", content: DICTIONARY[DEFAULT_LOCALE].seo.routes.roulette.robots },
				{ name: "author", content: DICTIONARY[DEFAULT_LOCALE].seo.routes.roulette.author },
				{ name: "theme-color", content: DICTIONARY[DEFAULT_LOCALE].seo.defaults.themeColor },
				{ name: "viewport", content: DICTIONARY[DEFAULT_LOCALE].seo.defaults.viewport },
				{ property: "og:type", content: DICTIONARY[DEFAULT_LOCALE].seo.routes.roulette.ogType },
				{ property: "og:title", content: DICTIONARY[DEFAULT_LOCALE].seo.routes.roulette.ogTitle },
				{ property: "og:description", content: DICTIONARY[DEFAULT_LOCALE].seo.routes.roulette.ogDescription },
				{ property: "og:site_name", content: DICTIONARY[DEFAULT_LOCALE].seo.routes.roulette.ogSiteName },
				{ property: "og:locale", content: DICTIONARY[DEFAULT_LOCALE].seo.defaults.ogLocale },
				{ property: "og:url", content: `${(import.meta.env.VITE_APP_URL ?? "").replace(/\/$/, "")}${ROUTES.ROULETTE.route(params.id)}` },
				{ property: "og:image", content: DICTIONARY[DEFAULT_LOCALE].seo.defaults.ogImage },
				{ property: "og:image:width", content: DICTIONARY[DEFAULT_LOCALE].seo.defaults.ogImageWidth },
				{ property: "og:image:height", content: DICTIONARY[DEFAULT_LOCALE].seo.defaults.ogImageHeight },
				{ property: "og:image:alt", content: DICTIONARY[DEFAULT_LOCALE].seo.defaults.ogImageAlt },
				{ name: "twitter:card", content: DICTIONARY[DEFAULT_LOCALE].seo.routes.roulette.twitterCard },
				{ name: "twitter:title", content: DICTIONARY[DEFAULT_LOCALE].seo.routes.roulette.twitterTitle },
				{ name: "twitter:description", content: DICTIONARY[DEFAULT_LOCALE].seo.routes.roulette.twitterDescription },
				{ name: "twitter:site", content: DICTIONARY[DEFAULT_LOCALE].seo.defaults.twitterSite },
				{ name: "twitter:image", content: DICTIONARY[DEFAULT_LOCALE].seo.defaults.twitterImage },
				{ name: "twitter:image:width", content: DICTIONARY[DEFAULT_LOCALE].seo.defaults.twitterImageWidth },
				{ name: "twitter:image:height", content: DICTIONARY[DEFAULT_LOCALE].seo.defaults.twitterImageHeight }
			],
			links: [
				{ rel: "canonical", href: `${(import.meta.env.VITE_APP_URL ?? "").replace(/\/$/, "")}${ROUTES.ROULETTE.route(params.id)}` },
				{ rel: "icon", type: "image/svg+xml", href: "/icon/logo.svg" },
				{ rel: "apple-touch-icon", href: "/icon/logo.svg" }
			],
			scripts: [
				{
					type: "application/ld+json",
					children: JSON.stringify(DICTIONARY[DEFAULT_LOCALE].seo.routes.roulette.jsonLd)
				}
			]

		});
	}
});

function Roulette() {
	return (
		<RoulettePage />
	);
}

export default Roulette;
