import { betterAuth, type BetterAuthOptions } from "better-auth";
import { serverConfig } from "../server/server-config";
import { clientConfig } from "../client/client-config";
import { createAuthClient } from "better-auth/client";
import { ROLES_LIST } from "../common/constants";

// validation types
export type RoleType = (typeof ROLES_LIST)[number];

// client props types
export type InitAuthClientProps = {
	options: ClientConfigProps;
};
export type ClientConfigProps= {
	baseURL: string;
}
export type GetClientSessionProps = {
	client: AuthClient;
	options?: GetSessionClientOptions;
};
export type ClientSocialSignInProps = {
	client: AuthClient;
	options: SocialClientOptions
};
export type ClientLogoutProps = {
	client: AuthClient;
	options?: SignOutClientOptions;
};
// client types
const defaultClientConfig = clientConfig({baseURL: ""});
export type AuthClient = ReturnType<typeof createAuthClient<typeof defaultClientConfig>>;
export type ClientSession = AuthClient["$Infer"]["Session"];
export type ClientSessionUser = ClientSession['user'];
export type ClientSessionSession = ClientSession['session'];
// client options types (parameters that directly passed to the better-auth client functions)
export type GetSessionClientOptions = Parameters<AuthClient["getSession"]>[0];
export type SocialClientOptions = Parameters<AuthClient["signIn"]["social"]>[0];
export type SignOutClientOptions = Parameters<AuthClient["getSession"]>[0];


// server props types
export type InitAuthServerProps = {
	options: ServerConfigProps
}
export type ServerConfigProps = {
	basePath: string;
	database: BetterAuthOptions["database"]; 
	baseUrl: string;
	secret: string;
	googleClientId: string;
	googleClientSecret: string;
	trustedOrigins: string[];
}
export type GetServerSessionProps = {
	server: AuthServer;
	options: GetSessionServerOptions;
};
export type ServerSocialSignInProps = {
	server: AuthServer;
	options: SocialServerOptions
};
export type ServerLogoutProps = {
	server: AuthServer;
	options: SignOutServerOptions;
};
export type ServerListUsersProps = {
	server: AuthServer;
	options: ListUsersServerOptions;
};
export type ServerAdminUpdateUserProps = {
	server: AuthServer;
	options: AdminUpdateUserServerOptions;
};
export type ServerSetRoleProps = {
	server: AuthServer;
	options: SetRoleServerOptions;
};
export type ServerRemoveUserProps = {
	server: AuthServer;
	options: RemoveUserServerOptions;
};
// server types
// const defaultServerConfig = betterAuth({
//     ...serverConfig({ basePath: "", database: {} as any, baseUrl: "", secret: "", googleClientId: "", googleClientSecret: "", trustedOrigins: [] }),
//     plugins: [admin(), bearer()] as const,
// });
const defaultServerConfig = betterAuth({
    ...serverConfig({ basePath: "", database: {} as any, baseUrl: "", secret: "", googleClientId: "", googleClientSecret: "", trustedOrigins: [] }),
    // plugins: [admin(), bearer()],
});
export type AuthServer = typeof defaultServerConfig;
export type ServerSession = AuthServer["$Infer"]["Session"];
export type ServerSessionUser = ServerSession['user'];
export type ServerSessionSession = ServerSession['session'];
// server options types
export type GetSessionServerOptions = Parameters<AuthServer["api"]["getSession"]>[0];
export type SocialServerOptions = Parameters<AuthServer["api"]["signInSocial"]>[0];
export type SignOutServerOptions = Parameters<AuthServer["api"]["signOut"]>[0];
export type ListUsersServerOptions = Parameters<AuthServer["api"]["listUsers"]>[0];
export type AdminUpdateUserServerOptions = Parameters<AuthServer["api"]["adminUpdateUser"]>[0];
export type SetRoleServerOptions = Parameters<AuthServer["api"]["setRole"]>[0];
export type RemoveUserServerOptions = Parameters<AuthServer["api"]["removeUser"]>[0];