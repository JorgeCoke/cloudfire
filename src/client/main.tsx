import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import "./index.css";
import App from "./app.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
