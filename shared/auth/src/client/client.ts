import type { ClientSocialSignInProps, ClientLogoutProps, ClientSession, GetClientSessionProps, ClientSessionUser, ClientSessionSession, InitAuthClientProps } from "../types";
import type { AuthClient } from "../types";
export * from "better-auth/client";
import { clientAuth } from "./client-auth";

let _authClient: AuthClient | null = null;

export function initAuthClient({options}: InitAuthClientProps): AuthClient {
	if (_authClient) {
		return _authClient;
	}

	_authClient = clientAuth(options);

	return _authClient;
}

export function getAuthClient(): AuthClient {
	if (!_authClient) {
		throw new Error("Auth client not initialized. Call initAuthClient({options}) first.");
	}
	
	return _authClient;
}

export async function isClientAuthenticated({client}: GetClientSessionProps): Promise<boolean> {
	try {
		const clientSession = await getClientSession({client});
		const clientSessionUser = clientSession?.user;

		if (!clientSessionUser) {
			return false;
		}	
		
		return true;
	}
	catch {
		return false;
	}
}

export async function getClientSession({
	client,
	options,
}: GetClientSessionProps): Promise<ClientSession | null> {
	try {
		const clientSession = await client.getSession(options);

		return clientSession.data;
	}
	catch {
		return null;
	}
}

export async function getClientSessionUser({
	client,
	options,
}: GetClientSessionProps): Promise<ClientSessionUser | null> {
	try {
		const clientSession = await getClientSession({client, options});
        const clientSessionUser = clientSession?.user;

		if (!clientSessionUser) {
			return null;
		}
		
		return clientSessionUser;
	}
	catch {
		return null;
	}
}

export async function getClientSessionSession({
	client,
	options,
}: GetClientSessionProps): Promise<ClientSessionSession | null> {
	try {
		const clientSession = await getClientSession({client, options});
        const clientSessionSession = clientSession?.session;

		if (!clientSessionSession) {
			return null;
		}

		return clientSessionSession;
	}
	catch {
		return null;
	}
}

export async function socialSignIn({
	client,
	options 
}: ClientSocialSignInProps): Promise<void> {
	await client.signIn.social(options);
}

export async function logout({
	client,
	options,
}: ClientLogoutProps): Promise<void> {
	await client.signOut(options);
}
