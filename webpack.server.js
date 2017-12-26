const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.js");
const webpackNodeExternals = require("webpack-node-externals");

const config = {
    // Inform webpack that we're building a bundle
    // for nodeJS, rather than for the browser
    target: "node",

    // Tell webpack the root file of our
    // server application
    entry: "./server.js",

    // Tell webpack where to put the output file
    // that is generated
    output: {
        filename: "buildServer.js",
        path: __dirname
    },

    externals: [webpackNodeExternals()],
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: "assets/",
                            emitFile: false
                        }
                    }
                ]
            }
        ]
    },
};

module.exports = merge(baseConfig, config);
