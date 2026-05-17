import { useEffect, useState } from "react";
import { donationApi } from "../api/client";

export default function DonationHistoryPage() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        donationApi.mine().then(setItems).catch(() => setItems([]));
    }, []);

    return (
        <section className="container section">
            <h2>Donation History</h2>
            <article className="glass-card">
                {items.length === 0 && <p>No donations found yet.</p>}
                <ul className="list-clean">
                    {items.map((item) => (
                        <li key={item._id} className="list-item stack">
                            <strong>{item.campaign?.title || "Campaign"}</strong>
                            <span>Amount: ${item.amount}</span>
                            <span>Status: {item.status}</span>
                            <span>Transaction: {item.transactionId}</span>
                        </li>
                    ))}
                </ul>
            </article>
        </section>
    );
}
