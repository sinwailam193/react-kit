import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { MuiThemeProvider } from "material-ui/styles";
import Routes from "./routes";
import { theme } from "../config";

export default class Main extends Component {
    render() {
        const { store } = this.props;

        return (
            <MuiThemeProvider theme={theme}>
                <Provider store={store}>
                    <BrowserRouter>
                        <div>{renderRoutes(Routes)}</div>
                    </BrowserRouter>
                </Provider>
            </MuiThemeProvider>
        );
    }
}
