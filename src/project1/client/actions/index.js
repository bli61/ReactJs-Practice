import axios from "axios";

const requestStart = flag => {
    return {
        type: "USER_FETCH_START",
        flag
    };
};

const requestSuccess = (res, flag) => {
    return {
        type: "USER_FETCH_SUCCESS",
        data: res.data,
        flag
    };
};

const requestFail = (error, flag) => {
    return {
        type: "USER_FETCH_FAIL",
        error,
        flag
    };
};

export const getUserList = () => {
    return (dispatch, store) => {
        dispatch(requestStart("GET"));
        axios
            .get("/api/users")
            .then(res => {
                dispatch(requestSuccess(res, "GET"));
            })
            .catch(err => {
                dispatch(requestFail(err, "GET"));
            });
    };
};

export const createNew = userInfo => {
    return (dispatch, store) => {
        dispatch(requestStart("CREATE"));
        console.log(userInfo);
        axios
            .post("/api/users", userInfo)
            .then(res => {
                dispatch(requestSuccess(res, "CREATE"));
            })
            .catch(err => {
                dispatch(requestFail(err, "CREATE"));
            });
    };
};

export const deleteUser = id => {
    return (dispatch, store) => {
        dispatch(requestStart("DELETE"));
        console.log(id);
        axios
            .delete(`/api/users/${id}`)
            .then(res => {
                dispatch(requestSuccess(res, "DELETE"));
            })
            .catch(err => {
                dispatch(requestFail(err, "DELETE"));
            });
    };
};

export const getOneUserById = id => {
    return (dispatch, store) => {
        dispatch(requestStart("GETONEID"));
        axios
            .get(`/api/users/${id}`)
            .then(res => {
                dispatch(requestSuccess(res, "GETONEID"));
            })
            .catch(err => {
                dispatch(requestFail(err, "GETONEID"));
            });
    };
};

export const updateUser = (id, newInfo) => {
    return (dispatch, store) => {
        dispatch(requestStart("UPDATE"));
        axios
            .put(`/api/users/${id}`, newInfo)
            .then(res => {
                dispatch(requestSuccess(res, "UPDATE"));
            })
            .catch(err => {
                dispatch(requestFail(err, "UPDATE"));
            });
    };
};

export const pageforward = () => {
    return {
        type: "FORWARD"
    };
};

export const pagebackward = () => {
    return {
        type: "BACKWARD"
    };
};
