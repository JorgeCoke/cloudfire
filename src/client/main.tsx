import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { HomePage } from "./pages/home.page.tsx";
import { ErrorPage } from "./pages/error.page.tsx";
import { useStore } from "@nanostores/react";
import { router } from "./router.ts";
import "./index.css";

const Routes = () => {
  const page = useStore(router);

  if (!page) {
    return <ErrorPage />;
  } else if (page.route === "HOME") {
    return <HomePage />;
  } else if (page.route === "ERROR") {
    return <ErrorPage code={page.params.code} />;
  }
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <main className="flex flex-col w-full">
      <Routes />
    </main>
  </StrictMode>
);
