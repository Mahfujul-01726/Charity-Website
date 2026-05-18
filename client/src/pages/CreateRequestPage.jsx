import React, { useState } from "react";
import { requestApi } from "../api/client";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "../context/LanguageContext";

const steps = ["details_step", "items_step", "review_step"];

export default function CreateRequestPage() {
    const { isAuthenticated } = useAuth();
    const { t } = useTranslation();
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [notice, setNotice] = useState("");
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        title: "",
        description: "",
        category: "Food",
        urgency: "Medium",
        address: "",
    });

    const getCategoryLabel = (cat) => {
        switch (cat) {
            case "Food": return t("cat_food");
            case "Clothing": return t("cat_clothing");
            case "Medical": return t("cat_medical");
            case "Education": return t("cat_education");
            case "Disaster Relief": return t("cat_disaster");
            default: return cat;
        }
    };

    const getUrgencyLabel = (urg) => {
        switch (urg) {
            case "Low": return t("urgency_low");
            case "Medium": return t("urgency_medium");
            case "High": return t("urgency_high");
            default: return urg;
        }
    };

    const onNext = async () => {
        if (currentStep < 2) {
            setCurrentStep((p) => p + 1);
            return;
        }
        if (!isAuthenticated) {
            setError(t("login_first_error"));
            return;
        }
        try {
            setLoading(true);
            setError("");
            await requestApi.create(form);
            setNotice(t("request_success_notice"));
            setCurrentStep(0);
            setForm({
                title: "",
                description: "",
                category: "Food",
                urgency: "Medium",
                address: "",
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="container section">
            <h2>{t("create_new_request")}</h2>
            
            <div className="steps-row">
                {steps.map((step, i) => (
                    <div key={step} className={`step-pill ${i <= currentStep ? "active" : ""}`}>
                        {t(step)}
                    </div>
                ))}
            </div>
            
            <article className="glass-card">
                <form className="form-grid" onSubmit={(e) => e.preventDefault()}>
                    {currentStep === 0 && (
                        <>
                            <label>
                                {t("request_title_label")}
                                <div style={{ position: 'relative' }}>
                                    <i className="ph ph-text-t" style={{ 
                                        position: 'absolute', 
                                        left: '16px', 
                                        top: '50%', 
                                        transform: 'translateY(-50%)', 
                                        color: 'var(--text-secondary)' 
                                    }}></i>
                                    <input
                                        value={form.title}
                                        onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                                        style={{ paddingLeft: '40px' }}
                                        placeholder={t("request_title_placeholder")}
                                    />
                                </div>
                            </label>
                            <label>
                                {t("request_desc_label")}
                                <textarea
                                    rows="4"
                                    value={form.description}
                                    onChange={(e) =>
                                        setForm((p) => ({ ...p, description: e.target.value }))
                                    }
                                    placeholder={t("request_desc_placeholder")}
                                />
                            </label>
                        </>
                    )}
                    
                    {currentStep === 1 && (
                        <>
                            <label>
                                {t("category_label")}
                                <div style={{ position: 'relative' }}>
                                    <i className="ph ph-tag" style={{ 
                                        position: 'absolute', 
                                        left: '16px', 
                                        top: '50%', 
                                        transform: 'translateY(-50%)', 
                                        color: 'var(--text-secondary)' 
                                    }}></i>
                                    <select
                                        value={form.category}
                                        onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                                        style={{ paddingLeft: '40px' }}
                                    >
                                        <option value="Food">{t("cat_food")}</option>
                                        <option value="Clothing">{t("cat_clothing")}</option>
                                        <option value="Medical">{t("cat_medical")}</option>
                                        <option value="Education">{t("cat_education")}</option>
                                        <option value="Disaster Relief">{t("cat_disaster")}</option>
                                    </select>
                                </div>
                            </label>
                            <label>
                                {t("urgency_label")}
                                <div style={{ position: 'relative' }}>
                                    <i className="ph ph-warning-circle" style={{ 
                                        position: 'absolute', 
                                        left: '16px', 
                                        top: '50%', 
                                        transform: 'translateY(-50%)', 
                                        color: 'var(--text-secondary)' 
                                    }}></i>
                                    <select
                                        value={form.urgency}
                                        onChange={(e) => setForm((p) => ({ ...p, urgency: e.target.value }))}
                                        style={{ paddingLeft: '40px' }}
                                    >
                                        <option value="Low">{t("urgency_low")}</option>
                                        <option value="Medium">{t("urgency_medium")}</option>
                                        <option value="High">{t("urgency_high")}</option>
                                    </select>
                                </div>
                            </label>
                            <label>
                                {t("delivery_address_label")}
                                <div style={{ position: 'relative' }}>
                                    <i className="ph ph-map-pin" style={{ 
                                        position: 'absolute', 
                                        left: '16px', 
                                        top: '50%', 
                                        transform: 'translateY(-50%)', 
                                        color: 'var(--text-secondary)' 
                                    }}></i>
                                    <input
                                        value={form.address}
                                        onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
                                        style={{ paddingLeft: '40px' }}
                                        placeholder={t("address_placeholder")}
                                    />
                                </div>
                            </label>
                        </>
                    )}
                    
                    {currentStep === 2 && (
                        <div style={{ 
                            padding: '16px', 
                            background: 'rgba(255,255,255,0.03)', 
                            borderRadius: '16px', 
                            border: '1px solid var(--glass-border)', 
                            marginBottom: '16px' 
                        }}>
                            <h3 style={{ marginBottom: '16px' }}>{t("review_request_title")}</h3>
                            <p style={{ marginBottom: '8px' }}>
                                <strong>{t("review_title")}:</strong> {form.title || t("not_provided")}
                            </p>
                            <p style={{ marginBottom: '8px' }}>
                                <strong>{t("review_description")}:</strong> {form.description || t("not_provided")}
                            </p>
                            <p style={{ marginBottom: '8px' }}>
                                <strong>{t("review_category")}:</strong> {getCategoryLabel(form.category)}
                            </p>
                            <p style={{ marginBottom: '8px' }}>
                                <strong>{t("review_urgency")}:</strong> {getUrgencyLabel(form.urgency)}
                            </p>
                            <p style={{ marginBottom: '8px' }}>
                                <strong>{t("review_address")}:</strong> {form.address || t("not_provided")}
                            </p>
                        </div>
                    )}
                    
                    <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                        {currentStep > 0 && (
                            <button 
                                className="btn btn-outline" 
                                type="button" 
                                onClick={() => setCurrentStep(p => p - 1)} 
                                disabled={loading} 
                                style={{ flex: 1 }}
                            >
                                <i className="ph ph-arrow-left"></i> {t("back_btn")}
                            </button>
                        )}
                        <button 
                            className="btn" 
                            type="button" 
                            onClick={onNext} 
                            disabled={loading} 
                            style={{ flex: 1 }}
                        >
                            {currentStep === 2 ? (
                                loading ? t("submitting_btn") : (
                                    <>
                                        <i className="ph ph-check-circle"></i> {t("submit_request_btn")}
                                    </>
                                )
                            ) : (
                                <>
                                    {t("next_btn")} <i className="ph ph-arrow-right"></i>
                                </>
                            )}
                        </button>
                    </div>
                </form>
                
                {notice && (
                    <div style={{ 
                        marginTop: '16px', 
                        padding: '12px', 
                        background: 'rgba(16, 185, 129, 0.1)', 
                        color: 'var(--success)', 
                        borderRadius: '8px', 
                        border: '1px solid rgba(16, 185, 129, 0.2)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px' 
                    }}>
                        <i className="ph ph-check-circle"></i> {notice}
                    </div>
                )}
                {error && (
                    <div style={{ 
                        marginTop: '16px', 
                        padding: '12px', 
                        background: 'rgba(239, 68, 68, 0.1)', 
                        color: 'var(--error)', 
                        borderRadius: '8px', 
                        border: '1px solid rgba(239, 68, 68, 0.2)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px' 
                    }}>
                        <i className="ph ph-warning-circle"></i> {error}
                    </div>
                )}
            </article>
        </section>
    );
}