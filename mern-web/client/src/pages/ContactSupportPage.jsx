export default function ContactSupportPage() {
    return (
        <section className="container section two-col">
            <article className="glass-card">
                <h2>Contact Support</h2>
                <p>Phone: +1 (800) 123-4567</p>
                <p>Email: support@charityapp.com</p>
                <p>Website: www.charityapp.com</p>
            </article>

            <article className="glass-card">
                <h3>Send us a message</h3>
                <form className="form-grid" onSubmit={(e) => e.preventDefault()}>
                    <label>
                        Your Name
                        <input />
                    </label>
                    <label>
                        Message
                        <textarea rows="4" />
                    </label>
                    <button className="btn" type="submit">
                        Send
                    </button>
                </form>
            </article>
        </section>
    );
}
