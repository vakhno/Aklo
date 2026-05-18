export const API_PREFIX = "/api" as const;

export const API_MOUNT = {
	language: `/language`,
	room: `/room`,
	roulette: `/roulette`,
	user: `/user`,
} as const;

export const API_SEGMENT = {
    LANGUAGE: {
        CRUD: {
            GET: {method: 'GET', path: '/:id'},
            POST: {method: 'POST', path: '/'},
            PUT: {method: 'PUT', path: '/:id'},
            DELETE: {method: 'DELETE', path: '/:id'},
        },
        LIST: {method: 'GET', path: '/'},
    },
    ROOM: {
        CRUD:{
            GET: {path: '/:id'},
            POST: {path: '/'},
            PUT: {path: '/:id'},
            DELETE: {path: '/:id'},
        },
        LIST: {method: 'GET', path: '/'},
        JOIN: {method: 'POST', path: '/:id/join'},
        IS_CREATOR: {method: 'GET', path: '/:id/is-creator'},
        IS_AVAILABLE_TO_VISIT: {method: 'GET', path: '/:id/is-available-to-visit'},
        USERS: {method: 'GET', path: '/:id/users'},
        REMOVE_USER: {method: 'DELETE', path: '/:id/users/:userId'},
        OWN_ROOM_IDS: {method: 'GET', path: '/own-room-ids'},
        LANGUAGES: {method: 'GET', path: '/language'},
    },
    ROULETTE: {
        CRUD:{
            GET: {path: '/:id'},
            POST: {path: '/'},
            PUT: {path: '/:id'},
            DELETE: {path: '/:id'},
        },
        LIST: {method: 'GET', path: '/'},
        LANGUAGES: {method: 'GET', path: '/language'},
        USERS: {method: 'GET', path: '/:id/users'},
        REMOVE_USER: {method: 'DELETE', path: '/:id/users/:userId'},
    },
    USER: {
        CRUD:{
            GET: {path: '/'},
            POST: {path: '/'},
            PUT: {path: '/:id'},
            DELETE: {path: '/:id'},
        },
        LIST: {method: 'GET', path: '/'},
    },
} as const;

export const ROUTES = {
    HOME: {path: '/'},
    ROOMS: {path: '/rooms'},
    RULES: {path: '/rules'},
    POLICY: {path: '/policy'},
    TERMS: {path: '/terms'},
    DASHBOARD: {path: '/dashboard'},
    LOGIN: {path: '/auth/login'},
    PROFILE: {path: '/profile'},
    ROOM: {path: '/room', route:(id: string) => `/room/${id}`},
    ROULETTE: {path: '/roulette', route:(id: string) => `/roulette/${id}`},
};

export const BLOCKED_DURING_AUTH_LIST = [
    ROUTES.LOGIN.path,
] as const;

export const AUTH_REQUIRED_PAGES_LIST = [
    ROUTES.PROFILE.path,
    ROUTES.ROOM.path,
    ROUTES.ROULETTE.path,
] as const;

export const ADMIN_REQUIRED_PAGES_LIST = [
    ROUTES.DASHBOARD.path,
] as const;

export const QUERIES = {
    ERROR_TOAST: "error_toast",
    ERROR_AUTH_TOAST: "error_auth_toast",
    AUTH_NEEDED: "auth_needed",
} as const;

export const ROOT_QUERIES = [
    QUERIES.ERROR_TOAST,
    QUERIES.AUTH_NEEDED,
    QUERIES.ERROR_AUTH_TOAST
];

export const COUNSUME_QUERIES = [ 
    QUERIES.ERROR_TOAST,
    QUERIES.AUTH_NEEDED,
    QUERIES.ERROR_AUTH_TOAST
];
