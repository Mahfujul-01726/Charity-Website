import { useEffect, useState } from "react";
import { donationApi } from "../api/client";
import { useTranslation } from "../context/LanguageContext";

export default function DonationHistoryPage() {
    const [items, setItems] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        donationApi.mine().then(setItems).catch(() => setItems([]));
    }, []);

    return (
        <section className="container section">
            <h2>{t("donation_history")}</h2>
            <article className="glass-card">
                {items.length === 0 && <p>{t("no_donations_yet")}</p>}
                <ul className="list-clean">
                    {items.map((item) => {
                        const statusKey = `status_${(item.status || "").toLowerCase()}`;
                        return (
                            <li key={item._id} className="list-item stack">
                                <strong>{item.campaign?.title || t("campaign")}</strong>
                                <span>{t("amount")}: ${item.amount}</span>
                                <span>{t("status")}: {t(statusKey)}</span>
                                <span>{t("transaction")}: {item.transactionId || t("not_provided")}</span>
                            </li>
                        );
                    })}
                </ul>
            </article>
        </section>
    );
}