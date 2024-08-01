import { createBrowserRouter } from "react-router-dom";
import GeneralError from "./pages/errors/general-error";
import NotFoundError from "./pages/errors/not-found-error";
import MaintenanceError from "./pages/errors/maintenance-error";
import UnauthorisedError from "./pages/errors/unauthorised-error.tsx";

const router = createBrowserRouter([
	// Auth routes
	{
		path: "/auth/log-in",
		lazy: async () => ({
			Component: (await import("./pages/auth/log-in")).default,
		}),
	},
	// Main routes
	{
		path: "/",
		lazy: async () => {
			const AppShell = await import("./components/app-shell");
			return { Component: AppShell.default };
		},
		errorElement: <GeneralError />,
		children: [
			{
				index: true,
				lazy: async () => ({
					Component: (await import("./pages/users/users")).default,
				}),
			},
			{
				path: "/tasks",
				lazy: async () => ({
					Component: (await import("./pages/tasks")).default,
				}),
			},
		],
	},

	// Error routes
	{ path: "/500", Component: GeneralError },
	{ path: "/404", Component: NotFoundError },
	{ path: "/503", Component: MaintenanceError },
	{ path: "/401", Component: UnauthorisedError },

	// Fallback 404 route
	{ path: "*", Component: NotFoundError },
]);

export default router;
