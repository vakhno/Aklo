import { test as base, type Page } from "@playwright/test";

export type AuthCookie = {
	name: string;
	value: string;
	domain: string;
	path: string;
	httpOnly?: boolean;
	secure?: boolean;
	sameSite?: "Strict" | "Lax" | "None";
};

export type AuthFixtures = {
	authenticatedPage: Page;
};

export type AuthFixtureOptions = {
	/**
	 * Async function that returns the auth cookies to inject into the browser context.
	 * Typically calls `serverTestAuth.$context.test.getCookies(...)` from `@shared/auth`.
	 */
	getCookies: () => Promise<AuthCookie[]>;
};

/**
 * Creates a Playwright `test` extended with an `authenticatedPage` fixture.
 * The fixture injects the auth cookies returned by `getCookies` before handing
 * the page to each test, so the user is already logged in.
 *
 * @example
 * // in apps/my-app/e2e/fixtures.ts
 * import { createAuthFixtures } from "@shared/e2e/fixtures";
 * import { serverTestAuth } from "@shared/auth/server-auth";
 *
 * const auth = serverTestAuth({ ...config });
 *
 * export const test = createAuthFixtures({
 *   getCookies: async () => {
 *     const testUtils = (await auth.$context).test;
 *     const user = testUtils.createUser({ email: "test@e2e.com", name: "E2E User", emailVerified: true });
 *     await testUtils.saveUser(user);
 *     return testUtils.getCookies({ userId: user.id, domain: "localhost" });
 *   },
 * });
 */
export function createAuthFixtures(options: AuthFixtureOptions) {
	return base.extend<AuthFixtures>({
		authenticatedPage: async ({ page }, use) => {
			const cookies = await options.getCookies();
			await page.context().addCookies(cookies);
			await use(page);
			await page.context().clearCookies();
		},
	});
}

export { test, expect } from "@playwright/test";
