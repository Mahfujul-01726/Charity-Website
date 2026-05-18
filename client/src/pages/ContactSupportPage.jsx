import React from "react";
import { useTranslation } from "../context/LanguageContext";

export default function ContactSupportPage() {
    const { t } = useTranslation();

    return (
        <section className="container section two-col">
            <article className="glass-card">
                <h2>{t("contact_support")}</h2>
                <p><strong>{t("phone_label")}:</strong> +1 (800) 123-4567</p>
                <p><strong>{t("email_label")}:</strong> support@charityapp.com</p>
                <p><strong>{t("website_label")}:</strong> www.charityapp.com</p>
            </article>
            <article className="glass-card">
                <h3>{t("send_us_message")}</h3>
                <form className="form-grid" onSubmit={(e) => e.preventDefault()}>
                    <label>
                        {t("full_name")}
                        <input placeholder={t("full_name")} />
                    </label>
                    <label>
                        {t("message")}
                        <textarea rows="4" placeholder={t("message")} />
                    </label>
                    <button className="btn" type="submit">
                        {t("send")}
                    </button>
                </form>
            </article>
        </section>
    );
}