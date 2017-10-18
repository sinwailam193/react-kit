import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import Routes from "./routes";

export default class Main extends Component {
    render() {
        const { store } = this.props;

        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div>{renderRoutes(Routes)}</div>
                </BrowserRouter>
            </Provider>
        );
    }
}
