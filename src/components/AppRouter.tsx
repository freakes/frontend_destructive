import React from 'react';
import AuthPage from "../pages/AuthPage";
import RegistrationPage from "../pages/RegistrationPage";
import NewsPage from "../pages/NewsPage";
import SchedulePage from "../pages/SchedulePage";
import UserProfile from "../pages/UserProfile";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import UsersPage from "../pages/UsersPage";
import Navbar from "./UI/navbar/Navbar";
import AppealsPage from "../pages/AppealsPage";

const AppRouter = () => {
    const routes = [
        {path: '/login', component: <AuthPage/>, exact: true},
        {path: '/news', component: <NewsPage/>, exact: true},
        {path: '/', component: <AuthPage/>, exact: true},
        {path: '/registration', component: <RegistrationPage/>, exact: true},
        {path: '/schedule', component: <SchedulePage/>, exact: true},
        {path: '/profile', component: <UserProfile/>, exact: true},
        {path: '/allUsers', component: <UsersPage/>, exact: true},
        {path: '/appeals', component: <AppealsPage/>, exact: true},

    ]

    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                {routes.map(route =>
                    <Route
                        element={route.component}
                        path={route.path}
                    />
                )}
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;