require("babel-polyfill");

if (process.env.NODE_ENV === "production") {
    require("./build/index");
} else {
    require("babel-register");
    require("./src/index");
}
