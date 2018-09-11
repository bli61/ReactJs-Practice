const initState = {
    isFetching: false,
    users: [],
    err: null,
    user: {},
    message: {}
};

const users = (state = initState, action) => {
    switch (action.type) {
        case "USER_FETCH_START":
            switch (action.flag) {
                case "GET":
                    return {
                        ...state,
                        isFetching: true
                    };
                case "GETONEID":
                    return {
                        ...state,
                        isFetching: true
                    };
                case "CREATE":
                    return {
                        ...state,
                        isFetching: true
                    };
                case "DELETE":
                    return {
                        ...state,
                        isFetching: true
                    };
                case "UPDATE":
                    return {
                        ...state,
                        isFetching: true
                    };
                default:
                    return state;
            }

        case "USER_FETCH_FAIL":
            switch (action.flag) {
                case "GET":
                    return {
                        ...state,
                        error: action.error,
                        isFetching: false,
                        err: "Cannot Connect To Server"
                    };
                case "GETONEID":
                    return {
                        ...state,
                        error: action.error,
                        isFetching: false,
                        err: "Cannot Connect To Server"
                    };
                case "CREATE":
                    return {
                        ...state,
                        error: action.error,
                        isFetching: false,
                        err: "Cannot Connect To Server"
                    };
                case "DELETE":
                    return {
                        ...state,
                        error: action.error,
                        isFetching: false,
                        err: "Cannot Connect To Server"
                    };
                case "UPDATE":
                    return {
                        ...state,
                        error: action.error,
                        isFetching: false,
                        err: "Cannot Connect To Server"
                    };
                default:
                    return state;
            }

        case "USER_FETCH_SUCCESS":
            switch (action.flag) {
                case "GET":
                    return {
                        ...state,
                        isFetching: false,
                        err: null,
                        users: action.data,
                        message: action.data.Message
                    };
                case "GETONEID":
                    return {
                        ...state,
                        isFetching: false,
                        err: null,
                        user: action.data,
                        message: action.data.Message
                    };
                case "CREATE":
                    console.log("in create:", state.users);
                    return {
                        isFetching: false,
                        err: null,
                        users: [...state.users, action.data],
                        message: action.data.Message
                    };

                case "DELETE":
                    return {
                        isFetching: false,
                        err: null,
                        users: state.users.filter(
                            obj => obj._id !== action.data._id
                        ),
                        message: action.data.Message
                    };

                case "UPDATE":
                    return {
                        isFetching: false,
                        err: null,
                        users: [
                            ...state.users.slice(
                                0,
                                state.users.findIndex(
                                    obj => obj._id === action.data._id
                                )
                            ),
                            action.data,
                            ...state.users.slice(
                                state.users.findIndex(
                                    obj => obj._id === action.data._id
                                ) + 1
                            )
                        ],
                        message: action.data.Message
                    };

                default:
                    return state;
            }

        default:
            return state;
    }
};

export default users;
