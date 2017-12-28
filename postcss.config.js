const postCSSImport = require("postcss-import");
const precss = require("precss");
const cssNext = require("postcss-cssnext");

module.exports = {
    plugins: [
        postCSSImport({ path: [`${__dirname}/style`, "node_modules"] }),
        precss(
            {
                /* ...options */
            },
        ),
        cssNext(
            {
                /* ...options */
            },
        ),
    ],
};
