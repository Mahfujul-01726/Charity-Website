import React, { useState } from "react";
import { useTranslation } from "../context/LanguageContext";

const initialMethods = [
    { id: "1", brand: "Visa", type: "Credit Card", lastFour: "1234", isDefault: true },
    { id: "2", brand: "Mastercard", type: "Credit Card", lastFour: "5678", isDefault: false },
    { id: "3", brand: "Chase Bank", type: "Bank Account", lastFour: "7890", isDefault: false },
];

export default function PaymentMethodsPage() {
    const { t } = useTranslation();
    const [methods, setMethods] = useState(initialMethods);

    const setDefault = (id) => {
        setMethods((prev) => prev.map((m) => ({ ...m, isDefault: m.id === id })));
    };

    return (
        <section className="container section">
            <h2>{t("payment_methods")}</h2>
            
            <div className="card-grid">
                {methods.map((item) => (
                    <article key={item.id} className="glass-card">
                        <h3>{item.brand}</h3>
                        <p>{item.type}</p>
                        <p>**** {item.lastFour}</p>
                        {item.isDefault ? (
                            <p className="success-text">{t("default_payment_label")}</p>
                        ) : (
                            <button className="btn btn-outline" onClick={() => setDefault(item.id)}>
                                {t("set_default_btn")}
                            </button>
                        )}
                    </article>
                ))}
            </div>
        </section>
    );
}