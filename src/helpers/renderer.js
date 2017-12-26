import React from "react";
import { renderToString } from "react-dom/server";
import { SheetsRegistry } from "react-jss/lib/jss";
import JssProvider from "react-jss/lib/JssProvider";
import { create } from "jss";
import preset from "jss-preset-default";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { renderRoutes } from "react-router-config";
import { Helmet } from "react-helmet";
import serialize from "serialize-javascript";
import createGenerateClassName from "material-ui/styles/createGenerateClassName";
import { MuiThemeProvider } from "material-ui/styles";
import { theme } from "../../config";
import Routes from "../routes";

const isProd = process.env.NODE_ENV === "production";

export const renderer = (req, store, context) => {
    if (!isProd) {
        return `
            <html>
                <head></head>
                <body>
                    <noscript>Need Javascript enabled</noscript>
                    <div id="root"></div>
                    <script>window.__INITIAL_STATE__ = ${serialize(store.getState())}</script>
                    <script src="vendor.js"></script>
                    <script src="bundle.js"></script>
                </body>
            </html>
        `;
    }
    const sheetsRegistry = new SheetsRegistry();
    const jss = create(preset());

    jss.options.createGenerateClassName = createGenerateClassName;

    const content = renderToString(<JssProvider registry={sheetsRegistry} jss={jss}>
        <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
            <Provider store={store}>
                <StaticRouter location={req.path} context={context}>
                    <div>{renderRoutes(Routes)}</div>
                </StaticRouter>
            </Provider>
        </MuiThemeProvider>
    </JssProvider>); // eslint-disable-line

    const helmet = Helmet.renderStatic();
    const css = sheetsRegistry.toString();

    return `
        <html>
            <head>
                ${helmet.title.toString()}
                ${helmet.meta.toString()}
                <link rel="stylesheet" href="main.css">
                <style id="jss-server-side">${css}</style>
            </head>
            <body>
                <div id="root">${content}</div>
                <script>window.__INITIAL_STATE__ = ${serialize(store.getState())}</script>
                <script src="vendor.js"></script>
                <script src="bundle.js"></script>
            </body>
        </html>
    `;
};
