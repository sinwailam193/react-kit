import React from "react";
import { hydrate, render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { AppContainer } from "react-hot-loader";
import axios from "axios";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import Main from "./main";
import reducers from "./reducers";
import "../style/main.css";

const isProd = process.env.NODE_ENV === "production";

const axiosInstance = axios.create({
    baseURL: "/api"
});

const store = createStore(
    reducers,
    window.__INITIAL_STATE__,
    composeWithDevTools(applyMiddleware(thunk.withExtraArgument({ api: axiosInstance })))
);

const renderApp = (Component, ssr) => {
    const app = (
        <AppContainer warnings={false}>
            <Component store={store} />
        </AppContainer>
    );
    const element = document.getElementById("root");
    if (ssr) {
        return hydrate(app, element);
    }
    return render(app, element);
};

renderApp(Main, isProd);

if (location.protocol === "https:" && "serviceWorker" in navigator) { // eslint-disable-line
    navigator.serviceWorker.register("./service-worker.js");
}

if (module.hot) {
    module.hot.accept("./main", () => {
        const newMain = require("./main").default;
        renderApp(newMain);
    });
    module.hot.accept("./reducers", () => {
        const newReducers = require("./reducers").default;
        store.replaceReducer(newReducers);
    });
}
