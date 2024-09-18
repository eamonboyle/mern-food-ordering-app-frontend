import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";
import HomePage from "./pages/home-page";
import AuthCallbackPage from "./pages/auth-callback-page";
import ProtectedRoute from "./auth/protected-route";
import LoadingSpinner from "./components/loading-spinner";

const UserProfilePage = React.lazy(() => import("./pages/user-profile-page"));
const ManageRestaurantPage = React.lazy(() => import("./pages/manage-restaurant-page"));
const SearchPage = React.lazy(() => import("./pages/search-page"));

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

            <Route
                path="/search/:city"
                element={
                    <Layout>
                        <Suspense fallback={<LoadingSpinner />}>
                            <SearchPage />
                        </Suspense>
                    </Layout>
                }
            />

            <Route element={<ProtectedRoute />}>
                <Route
                    path="/user-profile"
                    element={
                        <Layout>
                            <Suspense fallback={<LoadingSpinner />}>
                                <UserProfilePage />
                            </Suspense>
                        </Layout>
                    }
                />
                <Route
                    path="/manage-restaurant"
                    element={
                        <Layout>
                            <Suspense fallback={<LoadingSpinner />}>
                                <ManageRestaurantPage />
                            </Suspense>
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
