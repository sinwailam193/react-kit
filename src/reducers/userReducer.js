import { LIST_USER } from "../actions/userAction";

const INITIAL_STATE = {
    users: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case LIST_USER:
        return { ...state, users: action.users };
    default:
        return state;
    }
};
