import "babel-polyfill";
import express from "express";
import proxy from "express-http-proxy";
import favicon from "serve-favicon";
import { matchRoutes } from "react-router-config";
import Routes from "./src/routes";
import { generateStore, renderer } from "./src/helpers";
import { API_URL } from "./config";

const port = process.env.PORT || 4000;
const app = express();
const isProd = process.env.NODE_ENV === "production";

if (isProd) {
    app.use(express.static("public"));
} else {
    const webpack = require("webpack");
    const webpackConfig = require("./webpack.client");

    const compiler = webpack(webpackConfig);
    app.use(require("webpack-dev-middleware")(compiler, {
        noInfo: true,
        quiet: true,
        publicPath: webpackConfig.output.publicPath
    }));
    app.use(require("webpack-hot-middleware")(compiler, { log: false }));
}

// serve favicon
app.use(favicon(`assets/thumbnail.png`));
app.use(
    "/api",
    proxy(API_URL, {
        proxyReqOptDecorator(opts) {
            opts.headers["x-forwarded-host"] = `localhost:${port}`;
            return opts;
        }
    })
);

app.get("*", (req, res) => {
    const store = generateStore(req, res);
    const promises = matchRoutes(Routes, req.path)
        .map(({ route }) => (route.loadData ? route.loadData(store) : null))
        .map(promise => {
            if (promise) {
                return new Promise(resolve => {
                    promise.then(resolve).catch(resolve);
                });
            }
            return null;
        });
    return Promise.all(promises).then(() => {
        const context = {};
        const content = renderer(req, store, context);

        if (context.url) {
            return res.redirect(301, context.url);
        }
        if (context.notFound) {
            res.status(404);
        }
        res.send(content);
    });
});


app.listen(port, () => console.log(`Listening on port ${port}`)); // eslint-disable-line
