import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";
import HomePage from "./pages/home-page";

import AuthCallbackPage from "./pages/auth-callback-page";
import ProtectedRoute from "./auth/protected-route";
import LoadingSpinner from "./components/loading-spinner";
import NotFoundPage from "./pages/not-found";

const UserProfilePage = React.lazy(() => import("./pages/user-profile-page"));
const ManageRestaurantPage = React.lazy(() => import("./pages/manage-restaurant-page"));
const SearchPage = React.lazy(() => import("./pages/search-page"));
const RestaurantDetailPage = React.lazy(() => import("./pages/restaurant-detail-page"));

const AppRoutes = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderWithLayout = (Component: React.ComponentType<any>, showHero = false) => (
        <Layout showHero={showHero}>
            <Suspense fallback={<LoadingSpinner />}>
                <Component />
            </Suspense>
        </Layout>
    );

    return (
        <Routes>
            <Route path="/" element={renderWithLayout(HomePage, true)} />
            <Route path="/search/:city" element={renderWithLayout(SearchPage)} />

            <Route element={<ProtectedRoute />}>
                <Route path="/user-profile" element={renderWithLayout(UserProfilePage)} />
                <Route path="/manage-restaurant" element={renderWithLayout(ManageRestaurantPage)} />
            </Route>

            <Route path="/detail/:restaurantId" element={renderWithLayout(RestaurantDetailPage)} />
            <Route path="/auth/callback" element={<AuthCallbackPage />} />
            <Route path="*" element={renderWithLayout(NotFoundPage)} />
        </Routes>
    );
};

export default AppRoutes;
