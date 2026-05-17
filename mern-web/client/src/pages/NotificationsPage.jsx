import { notifications } from "../data/mockData";

export default function NotificationsPage() {
    return (
        <section className="container section">
            <h2>Notifications</h2>
            <div className="card-grid">
                {notifications.map((item) => (
                    <article className="glass-card" key={item.title}>
                        <h3 style={{ color: item.color }}>{item.title}</h3>
                        <p>{item.message}</p>
                        <p className="meta-text">{item.time}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}
