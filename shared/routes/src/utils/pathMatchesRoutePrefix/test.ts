import { describe, expect, it } from "vitest";

import { pathMatchesRoutePrefix } from "./index";

describe("pathMatchesRoutePrefix", () => {
	it("matches exact prefix", () => {
		expect(pathMatchesRoutePrefix("/room", "/room")).toBe(true);
		expect(pathMatchesRoutePrefix("/dashboard", "/dashboard")).toBe(true);
	});

	it("matches one segment deeper", () => {
		expect(pathMatchesRoutePrefix("/room/abc", "/room")).toBe(true);
		expect(pathMatchesRoutePrefix("/roulette/x", "/roulette")).toBe(true);
		expect(pathMatchesRoutePrefix("/dashboard/stats", "/dashboard")).toBe(true);
	});

	it("does not match sibling path that shares a prefix substring", () => {
		expect(pathMatchesRoutePrefix("/rooms", "/room")).toBe(false);
		expect(pathMatchesRoutePrefix("/roommate", "/room")).toBe(false);
	});

	it("does not match without leading slash boundary on prefix", () => {
		expect(pathMatchesRoutePrefix("/roomx/foo", "/room")).toBe(false);
	});
});
