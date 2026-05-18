import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../api/client";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "../context/LanguageContext";

export default function LoginPage() {
    const { login } = useAuth();
    const { t } = useTranslation();
    const navigate = useNavigate();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const data = await authApi.login({ email, password });
            login(data);
            navigate("/dashboard");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <section className="container section auth-wrap">
            <h2>{t("welcome_back_auth")}</h2>
            
            <form className="form-grid" onSubmit={handleSubmit}>
                <label>
                    {t("email")}
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    {t("password_label")}
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button className="btn" type="submit">
                    {t("login")}
                </button>
            </form>
            
            {error && <p className="error-text">{error}</p>}
            
            <p>
                {t("new_user_question")}{" "}
                <Link to="/register">{t("create_account_link")}</Link>
            </p>
        </section>
    );
}