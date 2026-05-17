import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import CampaignDetailsPage from "./pages/CampaignDetailsPage";
import CampaignsPage from "./pages/CampaignsPage";
import ContactSupportPage from "./pages/ContactSupportPage";
import CreateRequestPage from "./pages/CreateRequestPage";
import DashboardPage from "./pages/DashboardPage";
import DonationHistoryPage from "./pages/DonationHistoryPage";
import AllCategoriesPage from "./pages/AllCategoriesPage";
import CategoryDonationPage from "./pages/CategoryDonationPage";
import HelpSupportPage from "./pages/HelpSupportPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import NotificationsPage from "./pages/NotificationsPage";
import NgoLocatorPage from "./pages/NgoLocatorPage";
import PaymentMethodsPage from "./pages/PaymentMethodsPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import SearchPage from "./pages/SearchPage";
import SecurityPage from "./pages/SecurityPage";

export default function App() {
    return (
        <div className="app-layout">
            <Navbar />
            <main className="page-main">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/categories" element={<AllCategoriesPage />} />
                    <Route path="/donate/:category" element={<CategoryDonationPage />} />
                    <Route path="/campaigns" element={<CampaignsPage />} />
                    <Route path="/campaigns/:id" element={<CampaignDetailsPage />} />
                    <Route path="/ngo-locator" element={<NgoLocatorPage />} />
                    <Route path="/contact" element={<ContactSupportPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <DashboardPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/request"
                        element={
                            <ProtectedRoute>
                                <CreateRequestPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <ProfilePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/history"
                        element={
                            <ProtectedRoute>
                                <DonationHistoryPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/notifications"
                        element={
                            <ProtectedRoute>
                                <NotificationsPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/payments"
                        element={
                            <ProtectedRoute>
                                <PaymentMethodsPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/security"
                        element={
                            <ProtectedRoute>
                                <SecurityPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/help"
                        element={
                            <ProtectedRoute>
                                <HelpSupportPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}
