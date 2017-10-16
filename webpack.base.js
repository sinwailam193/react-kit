const prod = process.env.NODE_ENV === "production";
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const cssnano = require("cssnano");

module.exports = {
    // Tell webpack to run babel on every file it runs through
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    presets: [
                        "react",
                        "es2015",
                        "stage-0",
                        ["env", { targets: { browsers: ["last 2 versions"] } }]
                    ]
                }
            },
            {
                test: /\.css$/,
                use: prod ? ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader?importLoaders=1", "postcss-loader"]
                }) : ["style-loader", "css-loader?importLoaders=1", "postcss-loader"]
            }
        ]
    },
    plugins: prod
        ? [
            new ExtractTextPlugin({
                filename: "main.css"
            }),
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: cssnano,
                cssProcessorOptions: { discardComments: { removeAll: true } },
                canPrint: true
            })
        ]
        : []
};
