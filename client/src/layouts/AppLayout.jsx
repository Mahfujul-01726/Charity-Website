import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function AppLayout({ children }) {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className="app-layout">
            <Navbar />
            <main className="page-main">{children}</main>
            <Footer />
        </div>
    );
}
