import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import axios from "axios";
import reducers from "../client/reducers";

export default req => {
    const axiosInstance = axios.create({
        baseURL: "http://react-ssr-api.herokuapp.com",
        headers: { cookie: req.get("cookie") || "" }
    });

    const store = createStore(
        reducers,
        composeWithDevTools(applyMiddleware(thunk.withExtraArgument(axiosInstance)))
    );

    return store;
};
