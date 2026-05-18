/** Exact `prefix` or `prefix/...` (e.g. `/room/abc`), not `/rooms` for prefix `/room`. */
export const pathMatchesRoutePrefix = (pathname: string, prefix: string) => {
	return pathname === prefix || pathname.startsWith(`${prefix}/`);
};
