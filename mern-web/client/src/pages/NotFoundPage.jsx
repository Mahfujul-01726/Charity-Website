import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <section className="container section">
            <h2>Page Not Found</h2>
            <p>The page you are looking for does not exist.</p>
            <Link className="btn" to="/">
                Go Home
            </Link>
        </section>
    );
}
