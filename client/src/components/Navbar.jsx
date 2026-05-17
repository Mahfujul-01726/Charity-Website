import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { isAuthenticated, logout, user } = useAuth();
    const [open, setOpen] = useState(false);

    const close = () => setOpen(false);

    return (
        <header className={`nav-shell ${open ? "nav-open" : ""}`}>
            <nav className="container nav">
                <Link to="/" className="brand" onClick={close}>
                    <img
                        src="/logo.png"
                        alt="Charity"
                        style={{ width: 36, height: 36, objectFit: "contain", borderRadius: 8, background: "rgba(255,255,255,0.03)", padding: 4 }}
                    />
                    CHARITY
                </Link>

                <button
                    aria-label={open ? "Close menu" : "Open menu"}
                    className="nav-toggle"
                    onClick={() => setOpen((v) => !v)}
                >
                    <span className="bar" aria-hidden="true" />
                    <span className="bar" aria-hidden="true" />
                    <span className="bar" aria-hidden="true" />
                </button>

                <div className="nav-links" onClick={close}>
                    <NavLink to="/" end>
                        <i className="ph ph-house"></i> Home
                    </NavLink>
                    <NavLink to="/search">
                        <i className="ph ph-magnifying-glass"></i> Search
                    </NavLink>
                    <NavLink to="/categories">
                        <i className="ph ph-squares-four"></i> Categories
                    </NavLink>
                    <NavLink to="/campaigns">
                        <i className="ph ph-megaphone"></i> Campaigns
                    </NavLink>
                    <NavLink to="/ngo-locator">
                        <i className="ph ph-map-pin"></i> NGOs
                    </NavLink>
                    {isAuthenticated && (
                        <NavLink to="/dashboard">
                            <i className="ph ph-squares-four"></i> Dashboard
                        </NavLink>
                    )}
                    {isAuthenticated && (
                        <NavLink to="/profile">
                            <i className="ph ph-user"></i> Profile
                        </NavLink>
                    )}
                </div>

                <div className="nav-auth" onClick={close}>
                    {isAuthenticated ? (
                        <>
                            <span className="user-chip">
                                <i className="ph ph-user-circle"></i> {user?.name}
                            </span>
                            <button onClick={logout} className="btn btn-outline">
                                <i className="ph ph-sign-out"></i> Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link className="btn btn-outline" to="/login">
                                <i className="ph ph-sign-in"></i> Login
                            </Link>
                            <Link className="btn" to="/register">
                                <i className="ph ph-user-plus"></i> Join
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}