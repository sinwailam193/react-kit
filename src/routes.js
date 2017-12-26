import App from "./pages/app";
import Home from "./pages/home";
import NotFound from "./pages/notFound";

export default [{
    ...App,
    routes: [
        {
            ...Home,
            path: "/",
            exact: true
        },
        {
            ...NotFound
        }
    ]
}];
