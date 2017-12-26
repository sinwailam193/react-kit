import { APP_QUERY, AUTH_USER, LOG_OUT } from "../actions/authAction";

const INITIAL_STATE = {
    user: null,
    hello: null
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
    case AUTH_USER:
        return { ...state, user: action.user };
    case LOG_OUT:
        return { ...state, user: null };
    case APP_QUERY:
        return { ...state, ...action.payload };
    default:
        return state;
    }
}
