import { AuthServer, GetServerSessionProps, ServerLogoutProps, ServerSession, ServerSessionSession,ServerListUsersProps, ServerSessionUser, ServerSocialSignInProps, InitAuthServerProps, AdminUpdateUserServerOptions, ServerAdminUpdateUserProps, ServerSetRoleProps, ServerRemoveUserProps } from "../types";
import { serverAuth } from "./server-auth";

let _authServer: AuthServer | null = null;

export function initAuthServer({options}: InitAuthServerProps): AuthServer {
	if (_authServer) {
		return _authServer;
	}
	
    _authServer = serverAuth(options);

    return _authServer;
}

export function getAuthServer(): AuthServer {
	if (!_authServer) {
		throw new Error("Auth server not initialized. Call initAuthServer({options}) first.");
	}
	
	return _authServer;
}

export async function getServerSession({
	server,
    options,
}: GetServerSessionProps): Promise<ServerSession | null> {
	try {
		const serverSession = await server.api.getSession(options) as ServerSession | null;

		return serverSession;
	}
	catch (error) {
		return null;
	}
}

export async function getServerSessionUser({
    server,
    options,
}: GetServerSessionProps): Promise<ServerSessionUser | null> {
	try {
		const serverSession = await getServerSession({server, options});
        const serverSessionUser = serverSession?.user;

		if (!serverSessionUser) {
			return null;
		}

		return serverSessionUser;
	}
	catch {
		return null;
	}
}

export async function getServerSessionSession({
    server,
    options,
}: GetServerSessionProps): Promise<ServerSessionSession | null> {
	try {
		const serverSession = await getServerSession({server, options});
        const serverSessionSession = serverSession?.session;

		if (!serverSessionSession) {
			return null;
		}

		return serverSessionSession;
	}
	catch {
		return null;
	}
}

export async function socialSignIn({
	server,
	options
}: ServerSocialSignInProps): Promise<void> {
    await server.api.signInSocial(options)
}

export async function logout({
	server,
	options,
}: ServerLogoutProps): Promise<void> {
	await server.api.signOut(options);
}

export async function getListOfUsers({
	server,
	options,
}: ServerListUsersProps): Promise<any> {
	return await server.api.listUsers(options);
}

export async function adminUpdateUser({
	server,
	options,
}: ServerAdminUpdateUserProps): Promise<void> {
	await server.api.adminUpdateUser(options);
}

export async function setRole({
	server,
	options,
}: ServerSetRoleProps): Promise<void> {
	await server.api.setRole(options);
}

export async function removeUser({
	server,
	options,
}: ServerRemoveUserProps): Promise<void> {

	await server.api.removeUser(options);
}

export { toNodeHandler, fromNodeHeaders } from "better-auth/node";
export { mongodbAdapter } from "better-auth/adapters/mongodb";
