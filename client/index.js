/* eslint-disable global-require */
import React from "react";
import { render, hydrate } from "react-dom";
import BrowserRouter from "react-router-dom/BrowserRouter";
import asyncBootstrapper from "react-async-bootstrapper";
import { AsyncComponentProvider } from "react-async-component";
import { JobProvider } from "react-jobs";
import { Provider } from "react-redux";
import configureStore from "../src/redux/configureStore";

import "./polyfills";

import ReactHotLoader from "./components/ReactHotLoader";
import Application from "../src/components/Application";

// Get the DOM Element that will host our React application.
const container = document.querySelector("#app");

// Create our Redux store.
// Server side rendering would have mounted our state on this global.
const store = configureStore({ initialState: window.__APP_STATE__ }); // eslint-disable-line no-underscore-dangle

// Does the user's browser support the HTML5 history API?
// If the user's browser doesn't support the HTML5 history API then we
// will force full page refreshes on each page change.
const supportsHistory = "pushState" in window.history;

// Get any rehydrateState for the async components.
// eslint-disable-next-line no-underscore-dangle
const asyncComponentsRehydrateState = window.__ASYNC_COMPONENTS_REHYDRATE_STATE__;

// Get any "rehydrate" state sent back by the server
// eslint-disable-next-line no-underscore-dangle
const rehydrateState = window.__JOBS_STATE__;

/**
 * Renders the given React Application component.
 */
function renderApp(App, server) {
    // Firstly, define our full application component, wrapping the given
    // component app with a browser based version of react router.
    const app = (
        <ReactHotLoader warnings={false}>
            <AsyncComponentProvider rehydrateState={asyncComponentsRehydrateState}>
                <JobProvider rehydrateState={rehydrateState}>
                    <Provider store={store}>
                        <BrowserRouter forceRefresh={!supportsHistory}>
                            <App />
                        </BrowserRouter>
                    </Provider>
                </JobProvider>
            </AsyncComponentProvider>
        </ReactHotLoader>
    );

    if (server) {
        return asyncBootstrapper(app).then(() => hydrate(app, container));
    }
    return asyncBootstrapper(app).then(() => render(app, container));
}

renderApp(Application, true);

require("./registerServiceWorker");

// The following is needed so that we can support hot reloading our application.
if (process.env.BUILD_FLAG_IS_DEV === "true" && module.hot) {
    module.hot.dispose(data => {
        // Deserialize store and keep in hot module data for next replacement
        data.store = stringify(toJS(store)); // eslint-disable-line
    });

    // Accept changes to this file for hot reloading.
    module.hot.accept("./index.js");
    // Any changes to our App will cause a hotload re-render.
    module.hot.accept("../src/components/Application", () => {
        renderApp(require("../src/components/Application").default);
    });
}
