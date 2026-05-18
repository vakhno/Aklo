import { test, expect } from "@playwright/test";
import { ROUTES } from "@shared/routes/constants";

test.describe("Routes and redirects tests:", () => {
	test("guest visiting a room is sent to login", async ({ page }) => {
		await page.goto(ROUTES.ROOM.route("id"));
		await expect(page).toHaveURL(ROUTES.LOGIN.path);
	});

	test("guest visiting a roulette is sent to login", async ({ page }) => {
		await page.goto(ROUTES.ROULETTE.route("id"));
		await expect(page).toHaveURL(ROUTES.LOGIN.path);
	});

	test("guest visiting a profile is sent to login", async ({ page }) => {
		await page.goto(ROUTES.PROFILE.path);
		await expect(page).toHaveURL(ROUTES.LOGIN.path);
	});
});