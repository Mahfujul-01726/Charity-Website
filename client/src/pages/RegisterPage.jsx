import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../api/client";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "../context/LanguageContext";

export default function RegisterPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const { t } = useTranslation();
    
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const data = await authApi.register(form);
            login(data);
            navigate("/dashboard");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <section className="container section auth-wrap">
            <h2>{t("create_account_title")}</h2>
            
            <form className="form-grid" onSubmit={handleSubmit}>
                <label>
                    {t("full_name")}
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    {t("email")}
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    {t("password_label")}
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        minLength="6"
                    />
                </label>
                <button className="btn" type="submit">
                    {t("register_btn")}
                </button>
            </form>
            
            {error && <p className="error-text">{error}</p>}
            
            <p>
                {t("already_have_account")}{" "}
                <Link to="/login">{t("login")}</Link>
            </p>
        </section>
    );
}