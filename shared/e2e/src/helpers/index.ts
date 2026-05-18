import type { BrowserContext, Page } from "@playwright/test";
import type { AuthCookie } from "../fixtures";

/**
 * Injects auth cookies into the given browser context so subsequent requests
 * are authenticated. Pair with `serverTestAuth` test utils from `@shared/auth`.
 *
 * @example
 * const testUtils = (await auth.$context).test;
 * const user = testUtils.createUser({ email: "u@test.com", name: "Test", emailVerified: true });
 * await testUtils.saveUser(user);
 * const cookies = await testUtils.getCookies({ userId: user.id, domain: "localhost" });
 * await addAuthCookies(page.context(), cookies);
 */
export async function addAuthCookies(
	context: BrowserContext,
	cookies: AuthCookie[],
): Promise<void> {
	await context.addCookies(cookies);
}

/**
 * Clears all cookies from the browser context, effectively logging the user out
 * on the browser side without triggering a server-side signout request.
 */
export async function clearAuthCookies(context: BrowserContext): Promise<void> {
	await context.clearCookies();
}

/**
 * Navigates to `path` and waits for the network to be idle.
 * Prefer this over bare `page.goto` in e2e tests for more reliable assertions.
 */
export async function navigateTo(page: Page, path: string): Promise<void> {
	await page.goto(path, { waitUntil: "networkidle" });
}

/**
 * Asserts that the current URL ends with `path` (ignoring query strings and
 * the origin), then returns. Useful for redirect assertions.
 */
export async function expectRedirectTo(page: Page, path: string): Promise<void> {
	await page.waitForURL((url) => url.pathname === path, { timeout: 10_000 });
}

/**
 * Mocks a Google OAuth redirect so you can test OAuth flows without real Google
 * credentials. The mock intercepts any request to `accounts.google.com`, reads
 * `redirect_uri` and `state` from the query string, and immediately redirects
 * back with a dummy `code`.
 */
export async function mockGoogleOAuth(page: Page): Promise<void> {
	await page.route("https://accounts.google.com/**", async (route) => {
		const url = new URL(route.request().url());
		const redirectUri = url.searchParams.get("redirect_uri");
		const state = url.searchParams.get("state");

		if (redirectUri && state) {
			await route.fulfill({
				status: 302,
				headers: {
					Location: `${redirectUri}?code=mock-code&state=${state}`,
				},
			});
		}
		else {
			await route.continue();
		}
	});
}
