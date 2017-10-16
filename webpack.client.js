const prod = process.env.NODE_ENV === "production";
const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.js");
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");

const plugins = [
    new webpack.optimize.CommonsChunkPlugin({ name: "vendor", filename: "vendor.js" }),
    new SWPrecacheWebpackPlugin({
        cacheId: `v1${new Date().getTime().toString()}`,
        filename: "service-worker.js",
        minify: true,
        dontCacheBustUrlsMatching: /./,
        staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
        runtimeCaching: [
            {
                urlPattern: "/",
                handler: "networkFirst"
            },
            {
                urlPattern: /\/(users)/,
                handler: "networkFirst"
            }
        ]
    })
];

const config = {
    // Tell webpack the root file of our
    // server application
    entry: {
        app: "./src/client/index.js",
        vendor: [
            "react",
            "react-dom",
            "react-router",
            "react-router-dom",
            "react-router-config",
            "redux",
            "redux-thunk",
            "react-redux"
        ]
    },

    // Tell webpack where to put the output file
    // that is generated
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "public"),
        publicPath: "/",
    },
    devtool: prod ? false : "#inline-source-map",
    plugins: prod ? [...plugins,
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
    ] : plugins,
};

module.exports = merge(baseConfig, config);
