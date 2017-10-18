const prod = process.env.NODE_ENV === "production";
const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.js");
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");

const plugins = [
    new webpack.optimize.CommonsChunkPlugin({ name: "vendor", filename: "vendor.js" })
];

const prodApp = ["babel-polyfill", "./src/client/index.js"];

const config = {
    // Tell webpack the root file of our
    // server application
    entry: {
        app: prod ? prodApp : [
            "babel-polyfill",
            "webpack-hot-middleware/client?reload=true&silent=true",
            "react-hot-loader/patch",
            "./src/client/index.js"
        ],
        vendor: [
            "axios",
            "react",
            "react-dom",
            "react-router",
            "react-router-dom",
            "react-router-config",
            "react-helmet",
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
        hotUpdateChunkFilename: "hot-update.js",
        hotUpdateMainFilename: "hot-update.json"
    },
    devtool: prod ? false : "#inline-source-map",
    plugins: prod ? [...plugins,
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
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
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
    ] : [...plugins,
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
};

module.exports = merge(baseConfig, config);
