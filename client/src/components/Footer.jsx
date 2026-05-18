import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "../context/LanguageContext";

export default function Footer() {
    const { t } = useTranslation();
    const [email, setEmail] = useState("");
    const [subState, setSubState] = useState("idle"); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState("");
    
    // Live Impact Ticker Stats (simulating live blockchain trace / donor activity)
    const [stats, setStats] = useState({
        heartsBeat: 14820,
        amountRaised: 124890,
        activeNGOs: 58
    });

    useEffect(() => {
        // Increment statistics slightly to simulate real-time blockchain activity and live donations
        const interval = setInterval(() => {
            setStats(prev => ({
                heartsBeat: prev.heartsBeat + Math.floor(Math.random() * 3) + 1,
                amountRaised: prev.amountRaised + Math.floor(Math.random() * 25) + 5,
                activeNGOs: prev.activeNGOs + (Math.random() > 0.98 ? 1 : 0)
            }));
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!email) {
            setSubState("error");
            setErrorMessage(t("sub_error_empty"));
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setSubState("error");
            setErrorMessage(t("sub_error_invalid"));
            return;
        }

        setSubState("loading");
        
        // Simulate subscription API request
        setTimeout(() => {
            setSubState("success");
            setEmail("");
        }, 1500);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <footer className="site-footer">
            {/* Ambient Background Glowing Orbs */}
            <div className="footer-glow footer-glow-1"></div>
            <div className="footer-glow footer-glow-2"></div>
            
            <div className="container footer-top-row">
                <div className="footer-intro">
                    <Link to="/" className="brand footer-logo">
                        <i className="ph-fill ph-heart-beat pulse-icon"></i> {t("brand_name")}.
                    </Link>
                    <p className="footer-desc">
                        {t("footer_desc")}
                    </p>
                    
                    {/* Live blockchain ticker / platform status */}
                    <div className="platform-status">
                        <span className="pulse-dot"></span>
                        <span className="status-text">{t("blockchain_status")}</span>
                    </div>
                </div>

                {/* Newsletter Subscription Area */}
                <div className="footer-newsletter">
                    <h4>{t("join_movement")}</h4>
                    <p>{t("newsletter_subtitle")}</p>
                    
                    <form onSubmit={handleSubscribe} className={`newsletter-form state-${subState}`}>
                        <div className="input-group">
                            <i className="ph ph-envelope input-icon"></i>
                            <input 
                                type="email" 
                                placeholder={t("email_placeholder")} 
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (subState === "error") setSubState("idle");
                                }}
                                disabled={subState === "loading" || subState === "success"}
                                required
                            />
                            <button 
                                type="submit" 
                                className="btn btn-subscribe"
                                disabled={subState === "loading" || subState === "success"}
                            >
                                {subState === "idle" && (
                                    <>
                                        <span>{t("subscribe")}</span>
                                        <i className="ph ph-paper-plane-tilt btn-icon"></i>
                                    </>
                                )}
                                {subState === "loading" && (
                                    <div className="spinner"></div>
                                )}
                                {subState === "success" && (
                                    <i className="ph ph-check"></i>
                                )}
                                {subState === "error" && (
                                    <i className="ph ph-warning"></i>
                                )}
                            </button>
                        </div>
                        {subState === "error" && (
                            <p className="subscription-message error-msg">
                                <i className="ph ph-warning-circle"></i> {errorMessage}
                            </p>
                        )}
                        {subState === "success" && (
                            <p className="subscription-message success-msg">
                                <i className="ph ph-check-circle"></i> {t("sub_success")}
                            </p>
                        )}
                    </form>
                </div>
            </div>

            {/* Quick Live stats showcase */}
            <div className="container footer-stats-grid">
                <div className="stat-card">
                    <div className="stat-icon"><i className="ph-fill ph-heart"></i></div>
                    <div className="stat-details">
                        <span className="stat-number">{stats.heartsBeat.toLocaleString()}+</span>
                        <span className="stat-label">{t("active_donors")}</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon"><i className="ph-fill ph-coins"></i></div>
                    <div className="stat-details">
                        <span className="stat-number">${stats.amountRaised.toLocaleString()}</span>
                        <span className="stat-label">{t("total_funds_distributed")}</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon"><i className="ph-fill ph-handshake"></i></div>
                    <div className="stat-details">
                        <span className="stat-number">{t("verified_ngos_count", { count: stats.activeNGOs })}</span>
                        <span className="stat-label">{t("global_networks")}</span>
                    </div>
                </div>
            </div>

            <div className="container footer-grid">
                <div className="footer-links-col">
                    <h4>{t("explore_campaigns_footer")}</h4>
                    <div className="links-list">
                        <Link to="/campaigns" className="footer-link">
                            <i className="ph ph-caret-right"></i> {t("active_campaigns_footer")}
                        </Link>
                        <Link to="/categories" className="footer-link">
                            <i className="ph ph-caret-right"></i> {t("all_categories_footer")}
                        </Link>
                        <Link to="/ngo-locator" className="footer-link">
                            <i className="ph ph-caret-right"></i> {t("verified_ngo_locator")}
                        </Link>
                    </div>
                </div>
                
                <div className="footer-links-col">
                    <h4>{t("platform_legal")}</h4>
                    <div className="links-list">
                        <Link to="/contact" className="footer-link">
                            <i className="ph ph-caret-right"></i> {t("contact_support_footer")}
                        </Link>
                        <Link to="/help" className="footer-link">
                            <i className="ph ph-caret-right"></i> {t("help_center_faq")}
                        </Link>
                        <Link to="/security" className="footer-link">
                            <i className="ph ph-caret-right"></i> {t("crypto_security")}
                        </Link>
                    </div>
                </div>

                <div className="footer-links-col connect-col">
                    <h4>{t("connect_socially")}</h4>
                    <div className="social-links-grid">
                        <a href="#" target="_blank" rel="noreferrer" title="Twitter/X" className="social-pill twitter">
                            <i className="ph-fill ph-twitter-logo"></i>
                            <span>Twitter</span>
                        </a>
                        <a href="#" target="_blank" rel="noreferrer" title="Instagram" className="social-pill instagram">
                            <i className="ph-fill ph-instagram-logo"></i>
                            <span>Instagram</span>
                        </a>
                        <a href="#" target="_blank" rel="noreferrer" title="Facebook" className="social-pill facebook">
                            <i className="ph-fill ph-facebook-logo"></i>
                            <span>Facebook</span>
                        </a>
                        <a href="#" target="_blank" rel="noreferrer" title="LinkedIn" className="social-pill linkedin">
                            <i className="ph-fill ph-linkedin-logo"></i>
                            <span>LinkedIn</span>
                        </a>
                    </div>
                </div>
            </div>

            <div className="container footer-bottom">
                <div className="footer-bottom-left">
                    <p>&copy; {new Date().getFullYear()} {t("footer_copy")}</p>
                </div>
                <div className="footer-bottom-right">
                    <div className="footer-legal-links">
                        <Link to="/#">{t("privacy_security")}</Link>
                        <Link to="/#">{t("terms_user_agreement")}</Link>
                    </div>
                    {/* Dynamic Smooth scroll to top button inside footer */}
                    <button onClick={scrollToTop} className="scroll-top-btn" title={t("back_to_top")}>
                        <span>{t("back_to_top")}</span>
                        <i className="ph ph-arrow-up"></i>
                    </button>
                </div>
            </div>
        </footer>
    );
}