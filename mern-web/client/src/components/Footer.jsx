import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="container footer-grid">
                <div className="footer-brand">
                    <Link to="/" className="brand">
                        <i className="ph-fill ph-heart-beat"></i> CHARITY.
                    </Link>
                    <p>
                        Empowering communities and shifting the paradigm of donation tracing.
                        Committed to complete transparency.
                    </p>
                </div>
                <div className="footer-links">
                    <h4>Explore</h4>
                    <Link to="/campaigns"><i className="ph ph-caret-right"></i> Campaigns</Link>
                    <Link to="/categories"><i className="ph ph-caret-right"></i> Categories</Link>
                    <Link to="/ngo-locator"><i className="ph ph-caret-right"></i> NGO Locator</Link>
                </div>
                <div className="footer-links">
                    <h4>Platform</h4>
                    <Link to="/contact"><i className="ph ph-caret-right"></i> Contact Support</Link>
                    <Link to="/help"><i className="ph ph-caret-right"></i> Help Center</Link>
                    <Link to="/security"><i className="ph ph-caret-right"></i> Security</Link>
                </div>
                <div className="footer-links">
                    <h4>Connect</h4>
                    <div className="social-links">
                        <a href="#" target="_blank" rel="noreferrer" title="Twitter"><i className="ph ph-twitter-logo"></i></a>
                        <a href="#" target="_blank" rel="noreferrer" title="Instagram"><i className="ph ph-instagram-logo"></i></a>
                        <a href="#" target="_blank" rel="noreferrer" title="Facebook"><i className="ph ph-facebook-logo"></i></a>
                        <a href="#" target="_blank" rel="noreferrer" title="LinkedIn"><i className="ph ph-linkedin-logo"></i></a>
                    </div>
                </div>
            </div>
            <div className="container footer-bottom">
                <p>&copy; {new Date().getFullYear()} Charity Platform. All rights reserved.</p>
                <div className="footer-legal">
                    <Link to="/#">Privacy Policy</Link>
                    <Link to="/#">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
}