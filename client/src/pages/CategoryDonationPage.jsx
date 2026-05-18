import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { requestApi, uploadApi } from "../api/client";
import { donationCategories } from "../data/mockData";
import { useTranslation } from "../context/LanguageContext";

export default function CategoryDonationPage() {
    const { category } = useParams();
    const { t } = useTranslation();
    
    const categoryInfo = useMemo(
        () => donationCategories.find((item) => item.slug === category),
        [category]
    );

    const [form, setForm] = useState({
        itemName: "",
        description: "",
        quantity: 1,
        address: "",
        imageUrl: "",
    });
    const [notice, setNotice] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    if (!categoryInfo) {
        return (
            <section className="container section">
                <h2>{t("category_not_found")}</h2>
            </section>
        );
    }

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            setIsUploading(true);
            const url = await uploadApi.uploadImage(file);
            setForm((previous) => ({ ...previous, imageUrl: url }));
        } catch (error) {
            console.error(error);
            alert(t("image_upload_failed"));
        } finally {
            setIsUploading(false);
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            await requestApi.create({
                title: t("donation_offer_prefix", { item: form.itemName }),
                description: t("donation_offer_desc", {
                    quantity: form.quantity,
                    item: form.itemName,
                    description: form.description || "N/A",
                    imageUrl: form.imageUrl || "No Image",
                }),
                category: categoryInfo.title,
                urgency: "Medium",
                address: form.address || "Contact me",
            });
            setNotice(t("donation_save_success"));
            setForm({ itemName: "", description: "", quantity: 1, address: "", imageUrl: "" });
        } catch (error) {
            console.error("Donation offer failed", error);
            alert(t("donation_save_failed"));
        }
    };

    return (
        <section className="container section two-col">
            <article
                className="glass-card"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    justifyContent: "center",
                }}
            >
                <div
                    style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                        background: "var(--accent-gradient)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "2.5rem",
                        marginBottom: "24px",
                    }}
                >
                    <i className="ph ph-hand-heart"></i>
                </div>
                <div className="eyebrow">
                    {t("cat_" + categoryInfo.slug)} {t("donation_suffix")}
                </div>
                <h2>{t("cat_" + categoryInfo.slug + "_sub")}</h2>
                <p style={{ color: "var(--text-secondary)", lineHeight: "1.6", maxWidth: "400px" }}>
                    {t("category_donation_desc")}
                </p>
            </article>

            <article className="glass-card">
                <h3 style={{ marginBottom: "24px", display: "flex", alignItems: "center", gap: "8px" }}>
                    <i className="ph ph-package"></i> {t("item_details_title")}
                </h3>

                <form className="form-grid" onSubmit={onSubmit}>
                    <label>
                        {t("item_name_label")}
                        <div style={{ position: "relative" }}>
                            <i
                                className="ph ph-tag"
                                style={{
                                    position: "absolute",
                                    left: "16px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    color: "var(--text-secondary)",
                                }}
                            ></i>
                            <input
                                value={form.itemName}
                                onChange={(event) => setForm((previous) => ({ ...previous, itemName: event.target.value }))}
                                required
                                placeholder={t("item_name_placeholder")}
                                style={{ paddingLeft: "40px" }}
                            />
                        </div>
                    </label>

                    <label>
                        {t("request_desc_label")}
                        <textarea
                            rows="3"
                            value={form.description}
                            onChange={(event) => setForm((previous) => ({ ...previous, description: event.target.value }))}
                            placeholder={t("item_desc_placeholder")}
                        />
                    </label>

                    <div className="responsive-grid-2">
                        <label>
                            {t("quantity_label")}
                            <div style={{ position: "relative" }}>
                                <i
                                    className="ph ph-hash"
                                    style={{
                                        position: "absolute",
                                        left: "16px",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        color: "var(--text-secondary)",
                                    }}
                                ></i>
                                <input
                                    type="number"
                                    min="1"
                                    value={form.quantity}
                                    onChange={(event) =>
                                        setForm((previous) => ({ ...previous, quantity: event.target.value }))
                                    }
                                    required
                                    style={{ paddingLeft: "40px" }}
                                />
                            </div>
                        </label>

                        <label>
                            {t("pickup_address_label")}
                            <div style={{ position: "relative" }}>
                                <i
                                    className="ph ph-map-pin"
                                    style={{
                                        position: "absolute",
                                        left: "16px",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        color: "var(--text-secondary)",
                                    }}
                                ></i>
                                <input
                                    value={form.address}
                                    onChange={(event) => setForm((previous) => ({ ...previous, address: event.target.value }))}
                                    required
                                    placeholder={t("pickup_address_placeholder")}
                                    style={{ paddingLeft: "40px" }}
                                />
                            </div>
                        </label>
                    </div>

                    <label>
                        {t("image_upload_label")}
                        <div style={{ display: "flex", gap: "12px" }}>
                            <input type="file" accept="image/*" onChange={handleFileChange} style={{ flex: 1 }} />
                            {isUploading && (
                                <div style={{ display: "flex", alignItems: "center", color: "var(--cyan)" }}>
                                    <i className="ph ph-spinner-gap ph-spin"></i> {t("uploading")}
                                </div>
                            )}
                        </div>
                        {form.imageUrl && !isUploading && (
                            <div
                                style={{
                                    marginTop: "12px",
                                    borderRadius: "12px",
                                    overflow: "hidden",
                                    height: "120px",
                                    width: "100%",
                                    border: "1px solid var(--glass-border)",
                                }}
                            >
                                <img
                                    src={form.imageUrl}
                                    alt="preview"
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            </div>
                        )}
                    </label>

                    <button className="btn" type="submit" disabled={isUploading} style={{ width: "100%", marginTop: "16px" }}>
                        {isUploading ? (
                            t("please_wait")
                        ) : (
                            <>
                                <i className="ph ph-paper-plane-right"></i> {t("submit_donation_btn")}
                            </>
                        )}
                    </button>

                    {notice && (
                        <div
                            style={{
                                marginTop: "16px",
                                padding: "12px",
                                background: "rgba(16, 185, 129, 0.1)",
                                color: "var(--success)",
                                borderRadius: "8px",
                                border: "1px solid rgba(16, 185, 129, 0.2)",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                            }}
                        >
                            <i className="ph ph-check-circle"></i> {notice}
                        </div>
                    )}
                </form>
            </article>
        </section>
    );
}