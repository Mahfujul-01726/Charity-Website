import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function AppLayout({ children }) {
    return (
        <div className="app-layout">
            <Navbar />
            <main className="page-main">{children}</main>
            <Footer />
        </div>
    );
}
