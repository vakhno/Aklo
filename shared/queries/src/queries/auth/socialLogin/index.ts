import type { SocialClientOptions } from "@shared/auth/types";

import { getAuthClient, socialSignIn } from "@shared/auth/client";
import {
	useMutation,
	type UseMutationOptions
} from "@tanstack/react-query";

type UseSocialLoginProps = {
	options?: UseMutationOptions<void, Error, void>;
	socialOptions: SocialClientOptions;
};

const socialLoginMutationFn = async (socialOptions: SocialClientOptions) => {
	const client = getAuthClient();

	await socialSignIn({ client, options: socialOptions });
};

export function useSocialLogin({ options, socialOptions }: UseSocialLoginProps) {
	return useMutation({
		mutationFn: () => socialLoginMutationFn(socialOptions),
		...options
	});
}
