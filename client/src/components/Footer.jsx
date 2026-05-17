import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Footer() {
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
            setErrorMessage("Please enter an email address.");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setSubState("error");
            setErrorMessage("Please enter a valid email address.");
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
                        <i className="ph-fill ph-heart-beat pulse-icon"></i> CHARITY.
                    </Link>
                    <p className="footer-desc">
                        Empowering global communities by shifting the paradigm of donation tracing with absolute cryptographic transparency.
                    </p>
                    
                    {/* Live blockchain ticker / platform status */}
                    <div className="platform-status">
                        <span className="pulse-dot"></span>
                        <span className="status-text">Blockchain Tracing Verified &amp; Secured</span>
                    </div>
                </div>

                {/* Newsletter Subscription Area */}
                <div className="footer-newsletter">
                    <h4>Join the Movement</h4>
                    <p>Receive bi-weekly updates on campaigns, transparent tracing, and community impact.</p>
                    
                    <form onSubmit={handleSubscribe} className={`newsletter-form state-${subState}`}>
                        <div className="input-group">
                            <i className="ph ph-envelope input-icon"></i>
                            <input 
                                type="email" 
                                placeholder="Enter your email address" 
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
                                        <span>Subscribe</span>
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
                                <i className="ph ph-check-circle"></i> Welcome to our transparent giving network!
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
                        <span className="stat-label">Hearts Beat / Active Donors</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon"><i className="ph-fill ph-coins"></i></div>
                    <div className="stat-details">
                        <span className="stat-number">${stats.amountRaised.toLocaleString()}</span>
                        <span className="stat-label">Total Funds Distributed Safely</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon"><i className="ph-fill ph-handshake"></i></div>
                    <div className="stat-details">
                        <span className="stat-number">{stats.activeNGOs}+ Verified NGOs</span>
                        <span className="stat-label">Global Support Networks</span>
                    </div>
                </div>
            </div>

            <div className="container footer-grid">
                <div className="footer-links-col">
                    <h4>Explore Campaigns</h4>
                    <div className="links-list">
                        <Link to="/campaigns" className="footer-link">
                            <i className="ph ph-caret-right"></i> Active Campaigns
                        </Link>
                        <Link to="/categories" className="footer-link">
                            <i className="ph ph-caret-right"></i> All Categories
                        </Link>
                        <Link to="/ngo-locator" className="footer-link">
                            <i className="ph ph-caret-right"></i> Verified NGO Locator
                        </Link>
                    </div>
                </div>
                
                <div className="footer-links-col">
                    <h4>Platform &amp; Legal</h4>
                    <div className="links-list">
                        <Link to="/contact" className="footer-link">
                            <i className="ph ph-caret-right"></i> Contact &amp; Support
                        </Link>
                        <Link to="/help" className="footer-link">
                            <i className="ph ph-caret-right"></i> Help Center &amp; FAQ
                        </Link>
                        <Link to="/security" className="footer-link">
                            <i className="ph ph-caret-right"></i> Cryptographic Security
                        </Link>
                    </div>
                </div>

                <div className="footer-links-col connect-col">
                    <h4>Connect Socially</h4>
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
                    <p>&copy; {new Date().getFullYear()} CHARITY Platform. Built with absolute transparency &amp; trust.</p>
                </div>
                <div className="footer-bottom-right">
                    <div className="footer-legal-links">
                        <Link to="/#">Privacy &amp; Security</Link>
                        <Link to="/#">Terms &amp; User Agreement</Link>
                    </div>
                    {/* Dynamic Smooth scroll to top button inside footer */}
                    <button onClick={scrollToTop} className="scroll-top-btn" title="Back to top">
                        <span>Back To Top</span>
                        <i className="ph ph-arrow-up"></i>
                    </button>
                </div>
            </div>
        </footer>
    );
}