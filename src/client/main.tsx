import { useStore } from "@nanostores/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorPage } from "./pages/error.page.tsx";
import { HomePage } from "./pages/home.page.tsx";
import { router } from "./router.ts";
import "./index.css";
import { redirectPage } from "@nanostores/router";
import toast, { Toaster } from "react-hot-toast";
import { LoginPage } from "./pages/auth/login.page.tsx";
import { SignupPage } from "./pages/auth/signup.page.tsx";
import { DashboardPage } from "./pages/dashboard.page.tsx";
import { PlaygroundPage } from "./pages/playground.page.tsx";

const Routes = () => {
	// TODO: Lazy loading pages
	// TODO: Serve APP under "/app" URL
	// TODO: Serve static HTML under "/" (static HTML landing page with astro or similar)
	const page = useStore(router);

	const hasSessionGuard = (page: JSX.Element) => {
		if (!localStorage.getItem("jwt")) {
			redirectPage(router, "AUTH_LOGIN");
			setTimeout(() => {
				toast.error("Please, login first", { id: "logInFirst" });
			}, 100);
			return null;
		}
		return page;
	};

	const hasNotSessionGuard = (page: JSX.Element) => {
		if (localStorage.getItem("jwt")) {
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
		<Routes />
		<Toaster />
	</StrictMode>,
);
