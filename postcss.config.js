const smartImport = require("postcss-smart-import");
const precss = require("precss");
const autoprefixer = require("autoprefixer");

module.exports = {
    plugins: [
        smartImport({ /* ...options */ }),
        precss({ /* ...options */ }),
        autoprefixer({ /* ...options */ })
    ]
};
