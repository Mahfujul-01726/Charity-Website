import React, { useState } from "react";
import { useTranslation } from "../context/LanguageContext";

export default function SecurityPage() {
    const { t } = useTranslation();
    const [state, setState] = useState({
        twoFactor: false,
        loginAlerts: true,
        sessionTimeout: true,
        rememberDevice: false,
    });

    const toggle = (key) =>
        setState((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));

    return (
        <section className="container section">
            <h2>{t("security")}</h2>
            
            <article className="glass-card form-grid">
                <label className="switch-row">
                    <span>{t("two_factor_auth_label")}</span>
                    <input
                        type="checkbox"
                        checked={state.twoFactor}
                        onChange={() => toggle("twoFactor")}
                    />
                </label>
                
                <label className="switch-row">
                    <span>{t("login_alerts_label")}</span>
                    <input
                        type="checkbox"
                        checked={state.loginAlerts}
                        onChange={() => toggle("loginAlerts")}
                    />
                </label>
                
                <label className="switch-row">
                    <span>{t("session_timeout_label")}</span>
                    <input
                        type="checkbox"
                        checked={state.sessionTimeout}
                        onChange={() => toggle("sessionTimeout")}
                    />
                </label>
                
                <label className="switch-row">
                    <span>{t("remember_device_label")}</span>
                    <input
                        type="checkbox"
                        checked={state.rememberDevice}
                        onChange={() => toggle("rememberDevice")}
                    />
                </label>
            </article>
        </section>
    );
}