import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { donationCategories } from "../data/mockData";
import { campaignApi } from "../api/client";

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

export default function HomePage() {
    const [featured, setFeatured] = useState([]);

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
                    <div className="eyebrow"><i className="ph ph-sparkle" style={{marginRight: '6px'}}></i> Uniting Hands, Transforming Lives</div>
                    <h1><span className="gradient-text">Empower</span> Global Change With Every Donation</h1>
                    <p>
                        Discover causes that matter, support transparent campaigns, and track your impact
                        in a seamless, modern web experience.
                    </p>
                    <div className="hero-actions">
                        <Link className="btn" to="/campaigns">
                            Explore Campaigns <i className="ph ph-arrow-right"></i>
                        </Link>
                        <Link className="btn btn-outline" to="/categories">
                            <i className="ph ph-squares-four"></i> View Categories
                        </Link>
                        <Link className="btn btn-outline" to="/request">
                            <i className="ph ph-plus-circle"></i> Create Request
                        </Link>
                    </div>
                </div>
            </section>

            <section className="container section">
                <div className="section-head">
                    <h2>Featured Campaigns</h2>
                    <Link to="/campaigns">See all <i className="ph ph-caret-right"></i></Link>
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
                                    <img src={campaign.imageUrl || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80"} alt={campaign.title} />
                                </div>
                                <div className="campaign-content">
                                    <h3>{campaign.title}</h3>
                                    <p className="meta-text">{campaign.description.slice(0, 100)}...</p>
                                    <div className="progress">
                                        <span style={{ width: `${progress}%` }} />
                                    </div>
                                    <div className="meta" style={{marginBottom: '16px'}}>
                                        <i className="ph ph-trend-up"></i> Raised ${campaign.raisedAmount} of ${campaign.goalAmount}
                                    </div>
                                    <Link to={`/campaigns/${campaign._id}`} className="btn btn-secondary" style={{ width: '100%' }}>
                                        View Campaign
                                    </Link>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section className="container section">
                <div className="section-head">
                    <h2>Donation Categories</h2>
                    <Link to="/categories">See all <i className="ph ph-caret-right"></i></Link>
                </div>
                <div className="category-grid">
                    {donationCategories.slice(0, 6).map((item) => (
                        <Link
                            to={item.slug === "ngo" ? "/ngo-locator" : `/donate/${item.slug}`}
                            key={item.slug}
                            className="category-card"
                            style={{ "--cat-color": item.color }}
                        >
                            <div className="category-icon">
                                <i className={`ph ${getIconForCategory(item.slug)}`}></i>
                            </div>
                            <h3>{item.title}</h3>
                            <p className="meta-text">{item.subtitle}</p>
                        </Link>
                    ))}
                </div>
            </section>
        </>
    );
}
