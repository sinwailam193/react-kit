import AsyncHomeRoute from "./AsyncHomeRoute";
import AsyncUsersRoute from "./AsyncUsersRoute";
import Error404 from "./Error404";

export default [
    {
        name: "users",
        path: "/users",
        component: AsyncUsersRoute
    },
    {
        name: "home",
        path: "/",
        component: AsyncHomeRoute,
        exact: true
    },
    {
        name: "error",
        component: Error404
    }
];
