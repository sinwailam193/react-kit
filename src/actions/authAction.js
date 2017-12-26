import { deleteCookie } from "../helpers";

export const APP_QUERY = "APP_QUERY";
export const AUTH_USER = "AUTH_USER";
export const LOG_OUT = "LOG_OUT";

export const logout = res => {
    if (typeof document !== "undefined") {
        deleteCookie("token");
    } else if (res) {
        res.clearCookie("token");
    }
    return { type: LOG_OUT };
};

export const authUser = () => async (dispatch, getState, { api, res }) => {
    const resp = await api.get("/auth/user").catch(err => err);
    if (resp instanceof Error) {
        return dispatch(logout(res));
    }

    dispatch({
        type: AUTH_USER,
        user: resp.data
    });
};

export const appQuery = (query, variables = null) => async (dispatch, getState, { api, res }) => {
    const resp = await api.post("/graphql", { query, variables }).catch(err => err);
    if (resp instanceof Error) {
        return dispatch(logout(res));
    }

    dispatch({
        type: APP_QUERY,
        payload: resp.data.data
    });
};
