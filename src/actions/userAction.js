export const LIST_USER = "LIST_USER";

export const fetchUsers = () => async (dispatch, getState, { api }) => {
    const users = await api.get("/users");

    dispatch({
        type: LIST_USER,
        users: users.data
    });
};
