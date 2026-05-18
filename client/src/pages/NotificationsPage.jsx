import { useTranslation } from "../context/LanguageContext";
import { notifications } from "../data/mockData";

export default function NotificationsPage() {
    const { t } = useTranslation();

    const getNotificationTranslation = (title) => {
        if (title === "Donation Successful") {
            return {
                title: t("notif_title_success"),
                message: t("notif_msg_success"),
                time: t("notif_time_success"),
            };
        }
        if (title === "New Campaign") {
            return {
                title: t("notif_title_new"),
                message: t("notif_msg_new"),
                time: t("notif_time_new"),
            };
        }
        if (title === "Achievement Unlocked") {
            return {
                title: t("notif_title_badge"),
                message: t("notif_msg_badge"),
                time: t("notif_time_badge"),
            };
        }
        return null;
    };

    return (
        <section className="container section">
            <h2>{t("notifications")}</h2>
            <div className="card-grid">
                {notifications.map((item) => {
                    const translated = getNotificationTranslation(item.title) || item;
                    return (
                        <article className="glass-card" key={item.title}>
                            <h3 style={{ color: item.color }}>{translated.title}</h3>
                            <p>{translated.message}</p>
                            <p className="meta-text">{translated.time}</p>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}