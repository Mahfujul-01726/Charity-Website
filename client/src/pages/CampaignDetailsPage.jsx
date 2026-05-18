import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { campaignApi, donationApi } from "../api/client";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "../context/LanguageContext";

export default function CampaignDetailsPage() {
    const { id } = useParams();
    const { isAuthenticated } = useAuth();
    const { t } = useTranslation();
    const [campaign, setCampaign] = useState(null);
    const [amount, setAmount] = useState(10);
    const [message, setMessage] = useState("");
    const [notice, setNotice] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const loadCampaign = async () => {
            try {
                const data = await campaignApi.getById(id);
                setCampaign(data);
            } catch (err) {
                setError(err.message);
            }
        };
        loadCampaign();
    }, [id]);

    const handleDonate = async (e) => {
        e.preventDefault();
        setNotice("");
        setError("");
        try {
            await donationApi.create({
                campaignId: campaign._id,
                amount: Number(amount),
                message,
            });
            setNotice(t("donation_success_notice"));
            const refreshed = await campaignApi.getById(id);
            setCampaign(refreshed);
            setMessage("");
        } catch (err) {
            setError(err.message);
        }
    };

    if (!campaign) return <p className="container">{t("loading")}</p>;

    // Normalize category slug for dynamic translation
    const catSlug = campaign.category ? campaign.category.toLowerCase() : "";

    return (
        <section className="container section">
            <div className="two-col">
                <article className="details-card" style={{ display: 'flex', flexDirection: 'column' }}>
                    {campaign.imageUrl && (
                        <div className="details-banner-wrap">
                            <img 
                                src={campaign.imageUrl} 
                                alt={campaign.title} 
                                style={{ width: '100%', height: '300px', objectFit: 'cover' }} 
                            />
                        </div>
                    )}
                    <h2>{campaign.title}</h2>
                    <div className="chips-wrap" style={{ marginBottom: '16px' }}>
                        <span className="chip">
                            <i className="ph ph-tag"></i> {t("cat_" + catSlug)}
                        </span>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', flex: 1 }}>
                        {campaign.description}
                    </p>
                                        
                    <div style={{ 
                        marginTop: '24px', 
                        padding: '16px', 
                        background: 'rgba(255,255,255,0.03)', 
                        borderRadius: '16px', 
                        border: '1px solid var(--glass-border)' 
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ fontWeight: '600' }}>{t("raised")}: ${campaign.raisedAmount}</span>
                            <span style={{ color: 'var(--text-secondary)' }}>{t("goal")}: ${campaign.goalAmount}</span>
                        </div>
                        <div className="progress">
                            <span style={{ width: `${Math.min(100, (campaign.raisedAmount / campaign.goalAmount) * 100)}%` }} />
                        </div>
                    </div>
                </article>

                <section className="glass-card">
                    <h3><i className="ph ph-hand-heart"></i> {t("make_donation")}</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                        {t("donation_card_sub")}
                    </p>
                                        
                    {!isAuthenticated && (
                        <div style={{ textAlign: 'center', padding: '40px 0' }}>
                            <i className="ph ph-lock-key" style={{ 
                                fontSize: '3rem', 
                                color: 'var(--text-tertiary)', 
                                marginBottom: '16px', 
                                display: 'block' 
                            }}></i>
                            <p>{t("login_to_donate")}</p>
                        </div>
                    )}

                    {isAuthenticated && (
                        <form className="form-grid" onSubmit={handleDonate}>
                            <label>
                                {t("donation_amount_label")}
                                <div style={{ position: 'relative' }}>
                                    <i className="ph ph-currency-dollar" style={{ 
                                        position: 'absolute', 
                                        left: '16px', 
                                        top: '50%', 
                                        transform: 'translateY(-50%)', 
                                        color: 'var(--text-secondary)' 
                                    }}></i>
                                    <input
                                        type="number"
                                        min="1"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        style={{ paddingLeft: '40px' }}
                                    />
                                </div>
                            </label>
                            <label>
                                {t("message_optional")}
                                <textarea
                                    rows="4"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder={t("message_placeholder")}
                                />
                            </label>
                            <button className="btn" type="submit" style={{ width: '100%', marginTop: '8px' }}>
                                <i className="ph ph-heart"></i> {t("donate_now")}
                            </button>
                        </form>
                    )}

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
                </section>
            </div>
        </section>
    );
}