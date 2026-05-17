import { Route, Routes } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import { appRoutes } from "./routes/appRoutes";

export default function App() {
    return (
        <AppLayout>
            <Routes>
                {appRoutes.map((route) => {
                    const element = route.protected ? (
                        <ProtectedRoute>{route.element}</ProtectedRoute>
                    ) : (
                        route.element
                    );

                    return <Route key={route.path} path={route.path} element={element} />;
                })}
            </Routes>
        </AppLayout>
    );
}