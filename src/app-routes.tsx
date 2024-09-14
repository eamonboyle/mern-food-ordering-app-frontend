import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";
import HomePage from "./pages/home-page";
import AuthCallbackPage from "./pages/auth-callback-page";
import UserProfilePage from "./pages/user-profile-page";
import ProtectedRoute from "./auth/protected-route";

const AppRoutes = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Layout showHero={true}>
                        <HomePage />
                    </Layout>
                }
            />

            <Route element={<ProtectedRoute />}>
                <Route
                    path="/user-profile"
                    element={
                        <Layout>
                            <UserProfilePage />
                        </Layout>
                    }
                />
            </Route>

            <Route path="/auth/callback" element={<AuthCallbackPage />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRoutes;
