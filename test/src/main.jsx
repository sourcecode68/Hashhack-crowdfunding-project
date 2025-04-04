import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Events from "./events.jsx";
import App from "./App.jsx";
import Appp from "./Appp.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
