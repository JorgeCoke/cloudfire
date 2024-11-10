import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { HomePage } from "./pages/home.page.tsx";
import { ErrorPage } from "./pages/error.page.tsx";
import { useStore } from "@nanostores/react";
import { router } from "./router.ts";
import "./index.css";
import { LoginPage } from "./pages/auth/login.page.tsx";
import { SignupPage } from "./pages/auth/signup.page.tsx";
import { DashboardPage } from "./pages/dashboard.page.tsx";
import { Toaster } from "react-hot-toast";

const Routes = () => {
  // TODO: Lazy loading pages
  const page = useStore(router);

  if (!page) {
    return <ErrorPage />;
  } else if (page.route === "HOME") {
    return <HomePage />;
  } else if (page.route === "AUTH_LOGIN") {
    return <LoginPage />;
  } else if (page.route === "AUTH_SIGNUP") {
    return <SignupPage />;
  } else if (page.route === "DASHBOARD") {
    // TODO: Redirect to Login if no jwt is found
    return <DashboardPage />;
  } else if (page.route === "ERROR") {
    return <ErrorPage code={page.params.code} />;
  }
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <main className="flex flex-col w-full bg-neutral-50">
      <Routes />
    </main>
    <Toaster />
  </StrictMode>
);
