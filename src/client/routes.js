import React from "react"; // eslint-disable-line
import App from "./app";
import HomePage from "./pages/home_page";
import UsersListPage from "./pages/users_list_page";
import NotFoundPage from "./pages/not_found_page";
import AdminsListPage from "./pages/admins_list_page";

export default [
    {
        ...App,
        routes: [
            {
                ...HomePage,
                path: "/",
                exact: true
            },
            {
                ...AdminsListPage,
                path: "/admins"
            },
            {
                ...UsersListPage,
                path: "/users"
            },
            {
                ...NotFoundPage
            }
        ]
    }
];
