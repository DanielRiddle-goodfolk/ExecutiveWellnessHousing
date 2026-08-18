import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initAnalytics } from "./lib/analytics";
import { captureAttribution } from "./lib/attribution";

captureAttribution();
initAnalytics();

createRoot(document.getElementById("root")!).render(<App />);
