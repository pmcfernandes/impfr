import { createRoot } from "react-dom/client";
import "@app-shell/react/styles.css";
import "@form-editor/react/styles.css";
import "@auth/react/styles.css";
import "@table-editor/react/styles.css";
import "./styles.css";
import App from "./App.jsx";
import { installMockApi } from "./mockApi.js";

installMockApi();

createRoot(document.getElementById("root")).render(<App />);
