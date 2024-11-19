import { useStore } from "@nanostores/react";
import { type ReactNode, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { router } from "./router.ts";
import "./index.css";
import { redirectPage } from "@nanostores/router";
import { lazy } from "react";
import toast, { Toaster } from "react-hot-toast";
import { NavBar } from "./components/layout/navbar.tsx";
import { Modals } from "./modals/modals.tsx";
import HomePage from "./pages/home.page.tsx";
import ErrorPage from "./pages/shared/error.page.tsx";
import LoadingPage from "./pages/shared/loading.page.tsx";
import { $jwt } from "./services/auth.service.ts";

const LoginPage = lazy(() => import("./pages/auth/login.page.tsx"));
const SignupPage = lazy(() => import("./pages/auth/signup.page.tsx"));
const PlaygroundPage = lazy(() => import("./pages/shared/playground.page.tsx"));
const DashboardPage = lazy(
	() => import("./pages/protected/dashboard.page.tsx"),
);
const ProfilePage = lazy(() => import("./pages/protected/profile.page.tsx"));

const Routes = () => {
	const page = useStore(router);

	const hasSessionGuard = (page: ReactNode) => {
		if (!$jwt.get()?.jwt) {
			redirectPage(router, "AUTH_LOGIN");
			setTimeout(() => {
				toast.error("Please, login first", { id: "logInFirst" });
			}, 100);
			return null;
		}
		return page;
	};

	const hasNotSessionGuard = (page: ReactNode) => {
		if ($jwt.get()?.jwt) {
			redirectPage(router, "DASHBOARD");
			setTimeout(() => {
				toast.success("Welcome back", { id: "logInFirst" });
			}, 100);
			return null;
		}
		return page;
	};

	switch (page?.route) {
		case "HOME":
			return <HomePage />;
		case "AUTH_LOGIN":
			return hasNotSessionGuard(<LoginPage />);
		case "AUTH_SIGNUP":
			return hasNotSessionGuard(<SignupPage />);
		case "DASHBOARD":
			return hasSessionGuard(<DashboardPage />);
		case "PROFILE":
			return hasSessionGuard(<ProfilePage />);
		case "PLAYGROUND":
			return <PlaygroundPage />;
		case "ERROR":
			return <ErrorPage code={page.params.code} />;
		default:
			return <ErrorPage code={"404"} />;
	}
};

// biome-ignore lint/style/noNonNullAssertion: root will never be null
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<NavBar />
		<Suspense fallback={<LoadingPage />}>
			<Routes />
		</Suspense>
		<Modals />
		<Toaster />
	</StrictMode>,
);
