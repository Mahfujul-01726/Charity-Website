import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { campaignApi } from "../api/client";

export default function CampaignsPage() {
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
            <h2>Active Campaigns</h2>
            {loading && <p>Loading campaigns...</p>}
            {error && <p className="error-text">{error}</p>}
            <div className="card-grid">
                {campaigns.map((campaign) => {
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
                                <p className="meta-text">{campaign.description.slice(0, 120)}...</p>
                                <p className="meta">
                                    <i className="ph ph-tag"></i> {campaign.category}
                                </p>
                                <div className="progress">
                                    <span style={{ width: `${progress}%` }} />
                                </div>
                                <div className="meta" style={{marginBottom: '16px'}}>
                                    <i className="ph ph-trend-up"></i> Raised ${campaign.raisedAmount} of ${campaign.goalAmount}
                                </div>
                                <Link className="btn btn-secondary" style={{ width: '100%' }} to={`/campaigns/${campaign._id}`}>
                                    View Details <i className="ph ph-arrow-right"></i>
                                </Link>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}
