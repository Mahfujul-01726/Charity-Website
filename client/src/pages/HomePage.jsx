import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { donationCategories } from "../data/mockData";
import { campaignApi } from "../api/client";
import { useTranslation } from "../context/LanguageContext";

const getIconForCategory = (slug) => {
    const icons = {
        'education': 'ph-graduation-cap',
        'medical': 'ph-first-aid',
        'food': 'ph-bowl-food',
        'disaster': 'ph-house-line',
        'orphanage': 'ph-baby',
        'ngo': 'ph-buildings',
        'emergency': 'ph-ambulance',
        'requests': 'ph-clipboard-text'
    };
    return icons[slug] || 'ph-heart';
};

export default function HomePage() {
    const [featured, setFeatured] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        campaignApi.list().then(data => {
            setFeatured(data.slice(0, 3));
        }).catch(err => {
            console.error("Failed to load featured campaigns", err);
        });
    }, []);

    return (
        <>
            <section className="hero-wrap">
                <div className="container hero">
                    <div className="eyebrow">
                        <i className="ph ph-sparkle" style={{ marginRight: '6px' }}></i> 
                        {t("hero_eyebrow")}
                    </div>
                    <h1>
                        <span className="gradient-text">{t("hero_title_empower")}</span>
                        {t("hero_title_rest")}
                    </h1>
                    <p>{t("hero_desc")}</p>
                    <div className="hero-actions">
                        <Link className="btn" to="/campaigns">
                            {t("explore_campaigns")} <i className="ph ph-arrow-right"></i>
                        </Link>
                        <Link className="btn btn-outline" to="/categories">
                            <i className="ph ph-squares-four"></i> {t("view_categories")}
                        </Link>
                        <Link className="btn btn-outline" to="/request">
                            <i className="ph ph-plus-circle"></i> {t("create_request")}
                        </Link>
                    </div>
                </div>
            </section>

            <section className="container section">
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
                    <div className="card" style={{ flex: '1', minWidth: '200px', textAlign: 'center', padding: '30px' }}>
                        <i className="ph ph-hand-heart" style={{ fontSize: '3rem', color: '#8B5CF6' }}></i>
                        <h2 style={{ fontSize: '2.5rem', margin: '10px 0' }}>12K+</h2>
                        <p className="meta-text">{t("stats_donations") || "Donations Made"}</p>
                    </div>
                    <div className="card" style={{ flex: '1', minWidth: '200px', textAlign: 'center', padding: '30px' }}>
                        <i className="ph ph-users" style={{ fontSize: '3rem', color: '#06B6D4' }}></i>
                        <h2 style={{ fontSize: '2.5rem', margin: '10px 0' }}>35K+</h2>
                        <p className="meta-text">{t("stats_impacted") || "People Impacted"}</p>
                    </div>
                    <div className="card" style={{ flex: '1', minWidth: '200px', textAlign: 'center', padding: '30px' }}>
                        <i className="ph ph-clock" style={{ fontSize: '3rem', color: '#EC4899' }}></i>
                        <h2 style={{ fontSize: '2.5rem', margin: '10px 0' }}>48K+</h2>
                        <p className="meta-text">{t("stats_volunteers") || "Volunteer Hours"}</p>
                    </div>
                </div>
            </section>

            <section className="container section">
                <div className="section-head">
                    <h2>{t("featured_campaigns")}</h2>
                    <Link to="/campaigns">
                        {t("see_all")} <i className="ph ph-caret-right"></i>
                    </Link>
                </div>
                <div className="card-grid">
                    {featured.map((campaign) => {
                        const progress = Math.min(
                            100,
                            Math.round((campaign.raisedAmount / campaign.goalAmount) * 100)
                        );
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
                                    <p className="meta-text">{campaign.description.slice(0, 100)}...</p>
                                    <div className="progress">
                                        <span style={{ width: `${progress}%` }} />
                                    </div>
                                    <div className="meta" style={{ marginBottom: '16px' }}>
                                        <i className="ph ph-trend-up"></i> 
                                        {t("raised_of", { raised: campaign.raisedAmount, goal: campaign.goalAmount })}
                                    </div>
                                    <Link to={`/campaigns/${campaign._id}`} className="btn btn-secondary" style={{ width: '100%' }}>
                                        {t("view_campaign")}
                                    </Link>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section className="container section">
                <div className="section-head">
                    <h2>{t("donation_categories")}</h2>
                    <Link to="/categories">
                        {t("see_all")} <i className="ph ph-caret-right"></i>
                    </Link>
                </div>
                <div className="category-grid">
                    {donationCategories.slice(0, 8).map((item) => (
                        <Link
                            to={item.slug === "ngo" ? "/ngo-locator" : `/donate/${item.slug}`}
                            key={item.slug}
                            className="category-card"
                            style={{ "--cat-color": item.color }}
                        >
                            <div className="category-icon">
                                <i className={`ph ${getIconForCategory(item.slug)}`}></i>
                            </div>
                            <h3>{t("cat_" + (item.slug === "ngo" ? "ngos" : item.slug))}</h3>
                            <p className="meta-text">{t("cat_" + (item.slug === "ngo" ? "ngos" : item.slug) + "_sub")}</p>
                        </Link>
                    ))}
                </div>
            </section>
        </>
    );
}