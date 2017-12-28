import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import axios from "axios";
import reducer from "../reducers";

function configureStore({ initialState, request }) {
    const axiosConfig = { baseURL: "https://jsonplaceholder.typicode.com" };
    if (request) {
        axiosConfig.headers = { cookie: request.get("cookie") || "", origin: `${request.protocol}://${request.get("host")}` };
    }
    const axiosInstance = axios.create(axiosConfig);
    const enhancers = compose(
        applyMiddleware(thunk.withExtraArgument({ api: axiosInstance })),
        process.env.NODE_ENV === "development" && typeof window !== "undefined" && typeof window.devToolsExtension !== "undefined"
            ? // Call the brower extension function to create the enhancer.
            window.devToolsExtension()
            : // Else we return a no-op function.
            f => f
    );

    const store = initialState ? createStore(reducer, initialState, enhancers) : createStore(reducer, enhancers);

    if (process.env.NODE_ENV === "development" && module.hot) {
        // Enable Webpack hot module replacement for reducers. This is so that we
        // don't lose all of our current application state during hot reloading.
        module.hot.accept("../reducers", () => {
            const nextRootReducer = require("../reducers").default; // eslint-disable-line global-require

            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}

export default configureStore;
