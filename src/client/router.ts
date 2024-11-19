import { createRouter } from "@nanostores/router";

export const ROUTES = {
	HOME: "/",
	AUTH_LOGIN: "/auth/login",
	AUTH_SIGNUP: "/auth/signup",
	DASHBOARD: "/dashboard",
	PROFILE: "/profile",
	PLAYGROUND: "/playground",
	ERROR: "/error/:code",
} as const;

export const router = createRouter(ROUTES);
