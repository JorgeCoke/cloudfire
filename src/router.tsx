import { createBrowserRouter, Navigate } from "react-router-dom";
import ErrorPage from "./pages/error/error.page";

export const ROUTES = {
	AUTH: {
		LOG_IN: "/auth/log-in",
		SIGN_UP: "/auth/sign-up",
		RESET_PASSWORD: "/auth/reset-password",
	},
	PLAYGROUND: "/playground",
	DASHBOARD: {
		INDEX: "/dashboard",
		USERS: "/dashboard/users",
		TASKS: "/dashboard/tasks",
		SETTINGS: "/dashboard/settings",
	},
};

export const router = createBrowserRouter([
	// Testing Playground
	{
		path: ROUTES.PLAYGROUND,
		lazy: async () => ({
			Component: (await import("./pages/playground/playground.page")).default,
		}),
	},
	// Auth routes
	{
		path: "/",
		element: <Navigate to={ROUTES.AUTH.LOG_IN} replace />,
	},
	{
		path: ROUTES.AUTH.LOG_IN,
		lazy: async () => ({
			Component: (await import("./pages/auth/log-in.page")).default,
		}),
	},
	{
		path: ROUTES.AUTH.SIGN_UP,
		lazy: async () => ({
			Component: (await import("./pages/auth/sign-up.page")).default,
		}),
	},
	{
		path: ROUTES.AUTH.RESET_PASSWORD,
		lazy: async () => ({
			Component: (await import("./pages/auth/reset-password.page")).default,
		}),
	},
	// Dashboard rutes
	{
		path: ROUTES.DASHBOARD.INDEX,
		errorElement: <ErrorPage />,
		lazy: async () => ({
			Component: (await import("./components/layout/app-shell")).default,
		}),
		children: [
			{
				path: ROUTES.DASHBOARD.USERS,
				lazy: async () => ({
					Component: (await import("./pages/dashboard/users/users.page"))
						.default,
				}),
			},
			{
				path: ROUTES.DASHBOARD.TASKS,
				lazy: async () => ({
					Component: (await import("./pages/dashboard/tasks/page")).default,
				}),
			},
			{
				path: ROUTES.DASHBOARD.SETTINGS,
				lazy: async () => ({
					Component: (await import("./pages/dashboard/settings.page")).default,
				}),
			},
		],
	},
	// Error routes
	{ path: "/error/:errorCode", Component: ErrorPage },
	{ path: "*", Component: ErrorPage },
]);
