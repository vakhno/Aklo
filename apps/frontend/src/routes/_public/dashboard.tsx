import { getAuthClient, getClientSession } from "@shared/auth/client";
import { DEFAULT_LOCALE, DICTIONARY } from "@shared/locales";
import { ROUTES } from "@shared/routes/constants";
import { createFileRoute, redirect } from "@tanstack/react-router";

import DashboardPage from "@/pages/dashboard";

export const Route = createFileRoute("/_public/dashboard")({
	beforeLoad: async () => {
		let session;
		try {
			const client = getAuthClient();
			session = await getClientSession({ client });
		}
		catch {
			throw redirect({ to: "/" });
		}

		if (!session || !session.user) {
			throw redirect({ to: "/" });
		}

		const user = session.user as { role?: string };
		if (user.role !== "admin") {
			throw redirect({ to: "/" });
		}
	},
	component: DashboardPage,
	head: () => {
		return ({
			meta: [
				{ title: DICTIONARY[DEFAULT_LOCALE].seo.routes.dashboard.title },
				{ name: "description", content: DICTIONARY[DEFAULT_LOCALE].seo.routes.dashboard.description },
				{ name: "keywords", content: DICTIONARY[DEFAULT_LOCALE].seo.routes.dashboard.keywords },
				{ name: "robots", content: DICTIONARY[DEFAULT_LOCALE].seo.routes.dashboard.robots },
				{ name: "author", content: DICTIONARY[DEFAULT_LOCALE].seo.routes.dashboard.author },
				{ name: "theme-color", content: DICTIONARY[DEFAULT_LOCALE].seo.defaults.themeColor },
				{ name: "viewport", content: DICTIONARY[DEFAULT_LOCALE].seo.defaults.viewport },
				{ property: "og:type", content: DICTIONARY[DEFAULT_LOCALE].seo.routes.dashboard.ogType },
				{ property: "og:title", content: DICTIONARY[DEFAULT_LOCALE].seo.routes.dashboard.ogTitle },
				{ property: "og:description", content: DICTIONARY[DEFAULT_LOCALE].seo.routes.dashboard.ogDescription },
				{ property: "og:site_name", content: DICTIONARY[DEFAULT_LOCALE].seo.routes.dashboard.ogSiteName },
				{ property: "og:locale", content: DICTIONARY[DEFAULT_LOCALE].seo.defaults.ogLocale },
				{ property: "og:url", content: `${(import.meta.env.VITE_APP_URL ?? "").replace(/\/$/, "")}${ROUTES.DASHBOARD.path}` },
				{ property: "og:image", content: DICTIONARY[DEFAULT_LOCALE].seo.defaults.ogImage },
				{ property: "og:image:width", content: DICTIONARY[DEFAULT_LOCALE].seo.defaults.ogImageWidth },
				{ property: "og:image:height", content: DICTIONARY[DEFAULT_LOCALE].seo.defaults.ogImageHeight },
				{ property: "og:image:alt", content: DICTIONARY[DEFAULT_LOCALE].seo.defaults.ogImageAlt },
				{ name: "twitter:card", content: DICTIONARY[DEFAULT_LOCALE].seo.routes.dashboard.twitterCard },
				{ name: "twitter:title", content: DICTIONARY[DEFAULT_LOCALE].seo.routes.dashboard.twitterTitle },
				{ name: "twitter:description", content: DICTIONARY[DEFAULT_LOCALE].seo.routes.dashboard.twitterDescription },
				{ name: "twitter:site", content: DICTIONARY[DEFAULT_LOCALE].seo.defaults.twitterSite },
				{ name: "twitter:image", content: DICTIONARY[DEFAULT_LOCALE].seo.defaults.twitterImage },
				{ name: "twitter:image:width", content: DICTIONARY[DEFAULT_LOCALE].seo.defaults.twitterImageWidth },
				{ name: "twitter:image:height", content: DICTIONARY[DEFAULT_LOCALE].seo.defaults.twitterImageHeight }
			],
			links: [
				{ rel: "canonical", href: `${(import.meta.env.VITE_APP_URL ?? "").replace(/\/$/, "")}${ROUTES.DASHBOARD.path}` },
				{ rel: "icon", type: "image/svg+xml", href: "/icon/logo.svg" },
				{ rel: "apple-touch-icon", href: "/icon/logo.svg" }
			],
			scripts: [
				{
					type: "application/ld+json",
					children: JSON.stringify(DICTIONARY[DEFAULT_LOCALE].seo.routes.dashboard.jsonLd)
				}
			]

		});
	}
});
