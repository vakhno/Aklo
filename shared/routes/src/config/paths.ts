/** Frontend app route path constants */

export const HOME = "/";
export const DASHBOARD = "/dashboard";
export const ROOMS = "/rooms";
export const RULES = "/rules";
export const POLICY = "/policy";
export const TERMS = "/terms";

/** Dynamic path builders */

export function roomPath(id: string): string {
	return `/room/${id}`;
}

export function roulettePath(id: string): string {
	return `/roulette/${id}`;
}

/** Path check helpers - returns true for routes that don't require auth */

export function isPublicRoute(pathname: string): boolean {
	return (
		pathname.startsWith("/roulette/")
		|| pathname.startsWith("/room/")
	);
}

/** Redirect options when auth fails - use with redirect() in beforeLoad */
export function getAuthRedirect(): { to: string; search: { error: undefined } } {
	return {
		to: HOME,
		search: { error: undefined }
	};
}

/** Redirect options when admin check fails - use with redirect() in beforeLoad (e.g. dashboard) */
export function getAdminRedirect(): { to: string } {
	return { to: HOME };
}
