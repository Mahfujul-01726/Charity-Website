import { Link } from "react-router-dom";
import { donationCategories } from "../data/mockData";
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

export default function AllCategoriesPage() {
    const { t } = useTranslation();

    return (
        <section className="container section">
            <h2>{t("all_donation_categories")}</h2>
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
                        <h3>{t("cat_" + (item.slug === "ngo" ? "ngos" : item.slug))}</h3>
                        <p className="meta-text">{t("cat_" + (item.slug === "ngo" ? "ngos" : item.slug) + "_sub")}</p>
                    </Link>
                ))}
            </div>
        </section>
    );
}