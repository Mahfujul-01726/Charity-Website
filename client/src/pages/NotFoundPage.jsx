import { Link } from "react-router-dom";
import { useTranslation } from "../context/LanguageContext";

export default function NotFoundPage() {
    const { t } = useTranslation();

    return (
        <section className="container section">
            <h2>{t("page_not_found")}</h2>
            <p>{t("page_not_found_desc")}</p>
            <Link className="btn" to="/">
                {t("go_home")}
            </Link>
        </section>
    );
}