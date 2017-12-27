const prod = process.env.NODE_ENV === "production";
const webpack = require("webpack");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.js");
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");

const plugins = [
    new webpack.optimize.CommonsChunkPlugin({ name: "vendor", filename: "vendor.js" })
];

const directory = __dirname.replace("build", "");
const prodApp = ["babel-polyfill", `./src/index.js`];

const config = {
    // Tell webpack the root file of our
    // server application
    entry: {
        app: prod ? prodApp : [
            "babel-polyfill",
            "webpack-hot-middleware/client?reload=true&noInfo=true&quiet=true",
            "react-hot-loader/patch",
            `./src/index.js`
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
            "react-redux",
            "redux-devtools-extension",
            "material-ui"
        ]
    },
    // Tell webpack where to put the output file
    // that is generated
    output: {
        filename: "bundle.js",
        path: `${directory}public`,
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
                    urlPattern: /\/(users|admins)/,
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
    ],
    cache: true,
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: "assets/"
                        }
                    }
                ]
            }
        ]
    },
};

module.exports = merge(baseConfig, config);
