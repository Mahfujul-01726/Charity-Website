export default function HelpSupportPage() {
    const faq = [
        {
            q: "How do I make a donation?",
            a: "Choose a category or campaign and complete the form.",
        },
        {
            q: "Is payment information secure?",
            a: "Yes, all payment data should be processed securely on production gateways.",
        },
        {
            q: "How can I track my donations?",
            a: "Open Donation History from your profile area.",
        },
    ];

    return (
        <section className="container section">
            <h2>Help & Support</h2>
            <div className="card-grid">
                {faq.map((item) => (
                    <article className="glass-card" key={item.q}>
                        <h3>{item.q}</h3>
                        <p>{item.a}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}
