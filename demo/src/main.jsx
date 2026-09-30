import { createRoot } from "react-dom/client";
import "@pmcfernandes/app-shell/styles.css";
import "@pmcfernandes/form-editor/styles.css";
import "@pmcfernandes/auth/styles.css";
import "@pmcfernandes/table-editor/styles.css";
import "./styles.css";
import App from "./App.jsx";
import { installMockApi } from "./mockApi.js";

installMockApi();

createRoot(document.getElementById("root")).render(<App />);
