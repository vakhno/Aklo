export const ROLES = {USER: 'user', ADMIN: 'admin'} as const;

export const ROLES_LIST = [ROLES.USER, ROLES.ADMIN] as const;

export const DEFAULT_USER_ROLE = ROLES.USER as (typeof ROLES_LIST)[number];
