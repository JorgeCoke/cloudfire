import { createRouter } from "@nanostores/router";

export const $router = createRouter({
	HOME: "/",
	AUTH_LOGIN: "/auth/login",
	AUTH_SIGNUP: "/auth/signup",
	DASHBOARD: "/dashboard",
	PLAYGROUND: "/playground",
	ERROR: "/error/:code",
});
