import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { campaignApi } from "../api/client";
import { useTranslation } from "../context/LanguageContext";

export default function CampaignsPage() {
    const { t } = useTranslation();
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadCampaigns = async () => {
            try {
                const data = await campaignApi.list();
                setCampaigns(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadCampaigns();
    }, []);

    return (
        <section className="container section">
            <h2>{t("active_campaigns_footer")}</h2>
            
            {loading && <p>{t("loading")}</p>}
            {error && <p className="error-text">{error}</p>}
            
            <div className="card-grid">
                {campaigns.map((campaign) => {
                    const progress = Math.min(
                        100,
                        Math.round((campaign.raisedAmount / campaign.goalAmount) * 100)
                    );
                    
                    // Normalize category for dynamic translation slug
                    const catSlug = campaign.category ? campaign.category.toLowerCase() : "";
                    
                    return (
                        <article key={campaign._id} className="card campaign-banner">
                            <div className="img-wrap">
                                <img 
                                    src={campaign.imageUrl || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80"} 
                                    alt={campaign.title} 
                                />
                            </div>
                            <div className="campaign-content">
                                <h3>{campaign.title}</h3>
                                <p className="meta-text">{campaign.description.slice(0, 120)}...</p>
                                <p className="meta">
                                    <i className="ph ph-tag"></i> {t("cat_" + catSlug)}
                                </p>
                                <div className="progress">
                                    <span style={{ width: `${progress}%` }} />
                                </div>
                                <div className="meta" style={{ marginBottom: '16px' }}>
                                    <i className="ph ph-trend-up"></i> {t("raised_of", { raised: campaign.raisedAmount, goal: campaign.goalAmount })}
                                </div>
                                <Link 
                                    className="btn btn-secondary" 
                                    style={{ width: '100%' }} 
                                    to={`/campaigns/${campaign._id}`}
                                >
                                    {t("view_campaign")} <i className="ph ph-arrow-right"></i>
                                </Link>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}