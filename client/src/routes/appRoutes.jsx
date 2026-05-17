import AllCategoriesPage from "../pages/AllCategoriesPage";
import CampaignDetailsPage from "../pages/CampaignDetailsPage";
import CampaignsPage from "../pages/CampaignsPage";
import CategoryDonationPage from "../pages/CategoryDonationPage";
import ContactSupportPage from "../pages/ContactSupportPage";
import CreateRequestPage from "../pages/CreateRequestPage";
import DashboardPage from "../pages/DashboardPage";
import DonationHistoryPage from "../pages/DonationHistoryPage";
import HelpSupportPage from "../pages/HelpSupportPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import NgoLocatorPage from "../pages/NgoLocatorPage";
import NotFoundPage from "../pages/NotFoundPage";
import NotificationsPage from "../pages/NotificationsPage";
import PaymentMethodsPage from "../pages/PaymentMethodsPage";
import ProfilePage from "../pages/ProfilePage";
import RegisterPage from "../pages/RegisterPage";
import SearchPage from "../pages/SearchPage";
import SecurityPage from "../pages/SecurityPage";

export const appRoutes = [
    { path: "/", element: <HomePage /> },
    { path: "/search", element: <SearchPage /> },
    { path: "/categories", element: <AllCategoriesPage /> },
    { path: "/donate/:category", element: <CategoryDonationPage /> },
    { path: "/campaigns", element: <CampaignsPage /> },
    { path: "/campaigns/:id", element: <CampaignDetailsPage /> },
    { path: "/ngo-locator", element: <NgoLocatorPage /> },
    { path: "/contact", element: <ContactSupportPage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },
    { path: "/dashboard", element: <DashboardPage />, protected: true },
    { path: "/request", element: <CreateRequestPage />, protected: true },
    { path: "/profile", element: <ProfilePage />, protected: true },
    { path: "/history", element: <DonationHistoryPage />, protected: true },
    { path: "/notifications", element: <NotificationsPage />, protected: true },
    { path: "/payments", element: <PaymentMethodsPage />, protected: true },
    { path: "/security", element: <SecurityPage />, protected: true },
    { path: "/help", element: <HelpSupportPage />, protected: true },
    { path: "*", element: <NotFoundPage /> },
];
