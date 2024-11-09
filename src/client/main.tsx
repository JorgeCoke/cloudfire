import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import "./index.css";
import App from "./app.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <main className="flex flex-col w-full"></main>
    <App />
  </StrictMode>
);
