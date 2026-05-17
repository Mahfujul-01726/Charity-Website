import { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { isAuthenticated, logout, user } = useAuth();
    const [open, setOpen] = useState(false);
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "dark";
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    const menuRef = useRef(null);
    const toggleRef = useRef(null);
    const prevFocusRef = useRef(null);

    const close = () => setOpen(false);

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth > 900) {
                setOpen(false);
            }
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (!open) return;
        prevFocusRef.current = document.activeElement;
        const node = menuRef.current;
        const focusable = node?.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
        if (focusable && focusable.length) focusable[0].focus();

        document.body.style.overflow = "hidden";

        function onKey(e) {
            if (e.key === "Escape") {
                setOpen(false);
                return;
            }
            if (e.key === "Tab" && focusable && focusable.length) {
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                } else if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            }
        }

        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
            prevFocusRef.current?.focus();
        };
    }, [open]);

    return (
        <header className={`nav-shell ${open ? "nav-open" : ""}`}>
            <nav className="nav">
                <Link to="/" className="brand" onClick={close}>
                    <img
                        src="/logo.png"
                        alt="Charity"
                        style={{ width: 36, height: 36, objectFit: "contain", borderRadius: 8, background: "rgba(255,255,255,0.03)", padding: 4 }}
                    />
                    <span className="brand-text">CHARITY</span>
                </Link>

                <div className="nav-controls">
                    <button
                        onClick={toggleTheme}
                        className="theme-toggle mobile-only"
                        title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                    >
                        <i className={`ph ${theme === "dark" ? "ph-sun" : "ph-moon"}`}></i>
                    </button>

                    <button
                        ref={toggleRef}
                        aria-label={open ? "Close menu" : "Open menu"}
                        aria-expanded={open}
                        className="nav-toggle"
                        onClick={() => setOpen((v) => !v)}
                    >
                        <span className="bar" aria-hidden="true" />
                        <span className="bar" aria-hidden="true" />
                        <span className="bar" aria-hidden="true" />
                    </button>
                </div>

                <div className="menu-wrap" ref={menuRef}>
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
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleTheme();
                        }}
                        className="theme-toggle desktop-only"
                        title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                    >
                        <i className={`ph ${theme === "dark" ? "ph-sun" : "ph-moon"}`}></i>
                    </button>
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
                </div>
            </nav>
        </header>
    );
}