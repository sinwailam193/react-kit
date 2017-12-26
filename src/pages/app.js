import React, { Component } from "react";
import { renderRoutes } from "react-router-config";
import { authUser } from "../actions/authAction";
import { NavBar } from "./components";

class App extends Component {
    componentDidMount() {
        const jssStyles = document.getElementById("jss-server-side");
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }

    notFound = () => {
        const { route: { routes }, location: { pathname } } = this.props;
        for (let i = 0; i < routes.length - 1; i++) {
            const { path } = routes[i];
            if (path === pathname) {
                return false;
            }
        }
        return true;
    };

    render() {
        const { props: { route: { routes }, history }, notFound } = this;
        const isNotFound = notFound();

        return (
            <div className="app">
                {isNotFound ? null : <NavBar history={history} />}
                {renderRoutes(routes)}
            </div>
        );
    }
}

export default {
    component: App,
    loadData: ({ dispatch }) => dispatch(authUser())
};
