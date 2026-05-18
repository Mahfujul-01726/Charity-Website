import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { donationCategories, quickTags } from "../data/mockData";
import { campaignApi } from "../api/client";
import { useTranslation } from "../context/LanguageContext";

const getIconForCategory = (slug) => {
    const icons = {
        'education': 'ph-graduation-cap',
        'medical': 'ph-first-aid',
        'food': 'ph-bowl-food',
        'disaster': 'ph-house-line',
        'orphanage': 'ph-baby',
        'ngo': 'ph-buildings'
    };
    return icons[slug] || 'ph-heart';
};

export default function SearchPage() {
    const [query, setQuery] = useState("");
    const [allCampaigns, setAllCampaigns] = useState([]);
    const { t, language } = useTranslation();

    useEffect(() => {
        campaignApi.list().then(setAllCampaigns).catch(console.error);
    }, []);

    const results = useMemo(() => {
        if (!query.trim()) {
            return { categories: [], campaigns: [] };
        }
        const q = query.toLowerCase();
        return {
            categories: donationCategories.filter((item) => {
                const slug = item.slug === "ngo" ? "ngos" : item.slug;
                // Fetch English and Bangla titles/descriptions to support bilingual searching
                const titleEn = t("cat_" + slug, { lng: "en" }) || "";
                const titleBn = t("cat_" + slug, { lng: "bn" }) || "";
                const subEn = t("cat_" + slug + "_sub", { lng: "en" }) || "";
                const subBn = t("cat_" + slug + "_sub", { lng: "bn" }) || "";

                return (
                    item.title.toLowerCase().includes(q) ||
                    item.subtitle.toLowerCase().includes(q) ||
                    titleEn.toLowerCase().includes(q) ||
                    titleBn.toLowerCase().includes(q) ||
                    subEn.toLowerCase().includes(q) ||
                    subBn.toLowerCase().includes(q)
                );
            }),
            campaigns: allCampaigns.filter((c) => {
                const categoryKey = "cat_" + (c.category || "").toLowerCase();
                const categoryTranslated = t(categoryKey) || "";
                return (
                    c.title.toLowerCase().includes(q) ||
                    c.description.toLowerCase().includes(q) ||
                    (c.category || "").toLowerCase().includes(q) ||
                    categoryTranslated.toLowerCase().includes(q)
                );
            }),
        };
    }, [query, allCampaigns, t]);

    return (
        <section className="container section">
            <article className="glass-card" style={{ marginBottom: '40px', padding: '40px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>
                    {t("discover_campaigns_causes")}
                </h2>
                
                <div style={{ position: 'relative', maxWidth: '700px', margin: '0 auto 24px' }}>
                    <i 
                        className="ph ph-magnifying-glass" 
                        style={{ 
                            position: 'absolute', 
                            left: '20px', 
                            top: '50%', 
                            transform: 'translateY(-50%)', 
                            fontSize: '1.5rem', 
                            color: 'var(--text-secondary)' 
                        }}
                    ></i>
                    <input
                        placeholder={t("search_input_placeholder")}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        style={{ 
                            paddingLeft: '56px', 
                            paddingRight: '24px', 
                            fontSize: '1.1rem', 
                            height: '60px', 
                            borderRadius: '30px' 
                        }}
                    />
                    {query && (
                        <button 
                            onClick={() => setQuery("")}
                            style={{ 
                                position: 'absolute', 
                                right: '20px', 
                                top: '50%', 
                                transform: 'translateY(-50%)', 
                                background: 'transparent', 
                                border: 'none', 
                                color: 'var(--text-secondary)', 
                                cursor: 'pointer', 
                                fontSize: '1.2rem' 
                            }}
                        >
                            <i className="ph ph-x-circle"></i>
                        </button>
                    )}
                </div>

                {!query && (
                    <div style={{ textAlign: 'center' }}>
                        <p className="meta-text" style={{ marginBottom: '16px' }}>
                            {t("popular_searches")}
                        </p>
                        <div className="chips-wrap" style={{ justifyContent: 'center' }}>
                            {quickTags.map((tag) => {
                                const lowerTag = tag.toLowerCase();
                                const tagKey = "cat_" + (lowerTag === "ngo" ? "ngos" : lowerTag);
                                return (
                                    <button key={tag} className="chip" onClick={() => setQuery(tag)}>
                                        <i className="ph ph-trend-up"></i> {t(tagKey)}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </article>

            {query && (
                <>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                        <i className="ph ph-squares-four"></i> {t("category_results")} ({results.categories.length})
                    </h3>
                    <div className="category-grid" style={{ marginBottom: '40px' }}>
                        {results.categories.map((item) => {
                            const slug = item.slug === "ngo" ? "ngos" : item.slug;
                            return (
                                <Link 
                                    key={item.slug} 
                                    to={item.slug === "ngo" ? "/ngo-locator" : `/donate/${item.slug}`} 
                                    className="category-card" 
                                    style={{ "--cat-color": item.color }}
                                >
                                    <div className="category-icon">
                                        <i className={`ph ${getIconForCategory(item.slug)}`}></i>
                                    </div>
                                    <h4>{t("cat_" + slug)}</h4>
                                    <p className="meta-text">{t("cat_" + slug + "_sub")}</p>
                                </Link>
                            );
                        })}
                        {results.categories.length === 0 && (
                            <p className="meta-text">{t("no_categories_found")}</p>
                        )}
                    </div>

                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                        <i className="ph ph-megaphone"></i> {t("campaign_results")} ({results.campaigns.length})
                    </h3>
                    <div className="card-grid">
                        {results.campaigns.map((campaign) => {
                            const progress = Math.min(100, Math.round((campaign.raisedAmount / campaign.goalAmount) * 100));
                            return (
                                <article key={campaign._id} className="card campaign-banner">
                                    {campaign.imageUrl && (
                                        <div className="img-wrap">
                                            <img src={campaign.imageUrl} alt={campaign.title} />
                                        </div>
                                    )}
                                    <div className="campaign-content">
                                        <h3>{campaign.title}</h3>
                                        <p className="meta-text">{campaign.description.slice(0, 100)}...</p>
                                        <div className="progress">
                                            <span style={{ width: `${progress}%` }} />
                                        </div>
                                        <div className="meta" style={{ marginBottom: '16px' }}>
                                            <i className="ph ph-trend-up"></i> {t("raised_of", { raised: campaign.raisedAmount, goal: campaign.goalAmount })}
                                        </div>
                                        <Link to={`/campaigns/${campaign._id}`} className="btn btn-secondary" style={{ width: '100%' }}>
                                            {t("view_campaign")}
                                        </Link>
                                    </div>
                                </article>
                            );
                        })}
                        {results.campaigns.length === 0 && (
                            <p className="meta-text" style={{ gridColumn: '1 / -1', padding: '40px', textAlign: 'center', background: 'var(--glass-bg)', borderRadius: '24px', border: '1px solid var(--glass-border)' }}>
                                <i className="ph ph-magnifying-glass-minus" style={{ fontSize: '3rem', marginBottom: '16px', display: 'block', color: 'var(--text-tertiary)' }}></i>
                                {t("no_campaigns_found")}
                            </p>
                        )}
                    </div>
                </>
            )}
        </section>
    );
}