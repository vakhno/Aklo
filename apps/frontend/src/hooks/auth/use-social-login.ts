import type { SocialClientOptions } from "@shared/auth/types";

import { useSocialLogin } from "@shared/queries";
import { QUERIES, ROUTES } from "@shared/routes/constants";

type Provider = SocialClientOptions["provider"];

type UseSocialAuthLoginProps = {
	provider: Provider;
};

export function useSocialAuthLogin({
	provider
}: UseSocialAuthLoginProps) {
	const callbackURL = `${import.meta.env.VITE_APP_URL}${ROUTES.PROFILE.path}`;
	const newUserCallbackURL = `${import.meta.env.VITE_APP_URL}${ROUTES.PROFILE.path}`;
	const errorCallbackURL = `${import.meta.env.VITE_APP_URL}${ROUTES.LOGIN.path}?${QUERIES.ERROR_AUTH_TOAST}=true`;
	const { mutate, isPending } = useSocialLogin({
		socialOptions: {
			provider,
			callbackURL,
			errorCallbackURL,
			newUserCallbackURL
		}
	});

	return { login: mutate, isPending };
}
