import { describe, expect, it } from "vitest";

import { ROUTES } from "../../constants";
import { isAuthRequiredPage } from "./index";

describe("isAuthRequiredPage", () => {
	it("requires auth for dynamic room and roulette paths", () => {
		expect(isAuthRequiredPage(`${ROUTES.ROOM.route('id')}`)).toBe(true);
		expect(isAuthRequiredPage(`${ROUTES.ROULETTE.route('id')}`)).toBe(true);
	});

	it("does not treat /rooms as under /room", () => {
		expect(isAuthRequiredPage(ROUTES.ROOMS.path)).toBe(false);
	});

	it("does not require auth for public pages", () => {
		expect(isAuthRequiredPage(ROUTES.HOME.path)).toBe(false);
		expect(isAuthRequiredPage(ROUTES.LOGIN.path)).toBe(false);
	});
});
