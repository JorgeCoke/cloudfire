import { createRouter } from "@nanostores/router";

export const ROUTES = {
	HOME: "/app",
	AUTH_LOGIN: "/app/auth/login",
	AUTH_SIGNUP: "/app/auth/signup",
	DASHBOARD: "/app/dashboard",
	PLAYGROUND: "/app/playground",
	ERROR: "/app/error/:code",
} as const;

export const router = createRouter(ROUTES);
