import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";

import "@phosphor-icons/web/fill";
import "@phosphor-icons/web/regular";

import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import "./styles.css";
import "./responsive.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <HashRouter>
            <AuthProvider>
                <App />
            </AuthProvider>
        </HashRouter>
    </React.StrictMode>
);