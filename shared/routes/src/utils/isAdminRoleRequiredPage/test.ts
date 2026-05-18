import { describe, expect, it } from "vitest";

import { ROUTES } from "../../constants";
import { isAdminRoleRequiredPage } from "./index";

describe("isAdminRoleRequiredPage", () => {
	it("matches dashboard and nested paths", () => {
		expect(isAdminRoleRequiredPage(ROUTES.DASHBOARD.path)).toBe(true);
		expect(isAdminRoleRequiredPage(`${ROUTES.DASHBOARD.path}/settings`)).toBe(true);
	});

	it("does not match unrelated paths", () => {
		expect(isAdminRoleRequiredPage(ROUTES.HOME.path)).toBe(false);
		expect(isAdminRoleRequiredPage("/dash")).toBe(false);
	});
});
