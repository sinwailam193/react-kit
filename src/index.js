import "babel-polyfill";
import express from "express";
import { matchRoutes } from "react-router-config";
import proxy from "express-http-proxy";
import Routes from "./client/routes";
import renderer from "./helpers/renderer";
import createStore from "./helpers/createStore";

const port = 3000;
const app = express();
const isProd = process.env.NODE_ENV === "production";

if (!isProd) {
    const webpack = require("webpack");
    const webpackConfig = require("../webpack.client");
    const compiler = webpack(webpackConfig);
    app.use(require("webpack-dev-middleware")(compiler, {
        noInfo: true,
        quiet: true,
        publicPath: webpackConfig.output.publicPath
    }));
    app.use(require("webpack-hot-middleware")(compiler));
} else {
    app.use(express.static("public"));
}

app.use(
    "/api",
    proxy("http://react-ssr-api.herokuapp.com", {
        proxyReqOptDecorator(opts) {
            opts.headers["x-forwarded-host"] = `localhost:${port}`;
            return opts;
        }
    })
);
app.get("*", (req, res) => {
    const store = createStore(req);
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
    Promise.all(promises).then(() => {
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
