import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { renderRoutes } from "react-router-config";
import serialize from "serialize-javascript";
import { Helmet } from "react-helmet";
import Routes from "../client/routes";

export default (req, store, context) => {
    const content = renderToString(<Provider store={store}>
        <StaticRouter location={req.path} context={context}>
            <div>{renderRoutes(Routes)}</div>
        </StaticRouter>
    </Provider>); // eslint-disable-line

    const helmet = Helmet.renderStatic();

    return (
        `<html>
            <head>
                ${helmet.title.toString()}
                ${helmet.meta.toString()}
                ${process.env.NODE_ENV ? "<link rel=\"stylesheet\" href=\"main.css\">" : ""}
            </head>
            <body>
                <div id="root">${content}</div>
                <script>window.__INITIAL_STATE__ = ${serialize(store.getState())}</script>
                <script src="vendor.js"></script>
                <script src="bundle.js"></script>
            </body>
        </html>`
    );
};
