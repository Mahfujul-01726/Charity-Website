import { useTranslation } from "../context/LanguageContext";

export default function HelpSupportPage() {
    const { t } = useTranslation();

    const faq = [
        {
            q: t("faq_q1"),
            a: t("faq_a1"),
        },
        {
            q: t("faq_q2"),
            a: t("faq_a2"),
        },
        {
            q: t("faq_q3"),
            a: t("faq_a3"),
        },
    ];

    return (
        <section className="container section">
            <h2>{t("help_support_title")}</h2>
            <div className="card-grid">
                {faq.map((item, index) => (
                    <article className="glass-card" key={index}>
                        <h3>{item.q}</h3>
                        <p>{item.a}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}