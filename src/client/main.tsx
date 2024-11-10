import { useStore } from "@nanostores/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorPage } from "./pages/error.page.tsx";
import { HomePage } from "./pages/home.page.tsx";
import { router } from "./router.ts";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { LoginPage } from "./pages/auth/login.page.tsx";
import { SignupPage } from "./pages/auth/signup.page.tsx";
import { DashboardPage } from "./pages/dashboard.page.tsx";
import { PlaygroundPage } from "./pages/playground.page.tsx";

const Routes = () => {
	// TODO: Lazy loading pages
	// TODO: Serve APP under "/app" URL
	// TODO: Serve static HTML under "/" (static HTML landing page with astro or similar)
	const page = useStore(router);

	switch (page?.route) {
		case "HOME":
			return <HomePage />;
		case "AUTH_LOGIN":
			return <LoginPage />;
		case "AUTH_SIGNUP":
			return <SignupPage />;
		case "DASHBOARD":
			// TODO: Redirect to login if no valid session (use UserProvider o nanostores)
			return <DashboardPage />;
		case "PLAYGROUND":
			return <PlaygroundPage />;
		case "ERROR":
			return <ErrorPage code={page.params.code} />;
		default:
			return <ErrorPage code={"404"} />;
	}
};

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Routes />
		<Toaster />
	</StrictMode>,
);
