import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";
import reducers from "../reducers";
import { API_URL } from "../../config";

export const generateStore = (req, res) => {
    const axiosInstance = axios.create({
        baseURL: API_URL,
        headers: { cookie: req.get("cookie") || "", origin: `${req.protocol}://${req.get("host")}` }
    });

    const store = createStore(
        reducers,
        {},
        applyMiddleware(thunk.withExtraArgument({ api: axiosInstance, res }))
    );

    return store;
};
