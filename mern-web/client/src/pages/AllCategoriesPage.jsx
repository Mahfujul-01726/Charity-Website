import { Link } from "react-router-dom";
import { donationCategories } from "../data/mockData";

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

export default function AllCategoriesPage() {
    return (
        <section className="container section">
            <h2>All Donation Categories</h2>
            <div className="category-grid">
                {donationCategories.map((item) => (
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
    );
}
