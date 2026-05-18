/** Default app meta for head() - framework-agnostic */

export const DEFAULT_APP_TITLE = "Aklo - language practice app";

export const DEFAULT_HEAD = {
	meta: [
		{ title: DEFAULT_APP_TITLE }
	]
} as const;

/** Per-route page titles */
export const HOME_TITLE = "Aklo - Home";
export const ROOMS_TITLE = "Language Roulettes & Topic Rooms";
export const RULES_TITLE = "Aklo - Rules";
export const POLICY_TITLE = "Aklo - Privacy";
export const TERMS_TITLE = "Aklo - Terms";
export const ROOM_TITLE = "Aklo - Room";
export const ROULETTE_TITLE = "Aklo - Roulette";
export const DASHBOARD_TITLE = "Aklo - Dashboard";
export const AUTH_CALLBACK_TITLE = "Aklo - Signing in";

/** Simple head configs for routes with minimal meta */
export const ROOM_HEAD = { meta: [{ title: ROOM_TITLE }] } as const;
export const ROULETTE_HEAD = { meta: [{ title: ROULETTE_TITLE }] } as const;
export const RULES_HEAD = { meta: [{ title: RULES_TITLE }] } as const;
export const POLICY_HEAD = { meta: [{ title: POLICY_TITLE }] } as const;
export const TERMS_HEAD = { meta: [{ title: TERMS_TITLE }] } as const;
export const AUTH_CALLBACK_HEAD = { meta: [{ title: AUTH_CALLBACK_TITLE }] } as const;
