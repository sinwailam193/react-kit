import React, { Component } from "react";
import { renderRoutes } from "react-router-config";
import Header from "../components/header";
import { fetchCurrentUser } from "../actions";

class App extends Component {
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
        const { props: { route: { routes } }, notFound } = this;
        const isNotFound = notFound();

        return (
            <div>
                {!isNotFound ? <Header /> : null}
                {renderRoutes(routes)}
            </div>
        );
    }
}

export default {
    component: App,
    loadData: ({ dispatch }) => dispatch(fetchCurrentUser())
};
