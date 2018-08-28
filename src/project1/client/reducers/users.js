const initState = { isFetching: false, users: [], err: null, user: {} };

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
                        isFetching: false
                    };
                case "GETONEID":
                    return {
                        ...state,
                        error: action.error,
                        isFetching: false
                    };
                case "CREATE":
                    return {
                        ...state,
                        error: action.error,
                        isFetching: false
                    };
                case "DELETE":
                    return {
                        ...state,
                        error: action.error,
                        isFetching: false
                    };
                case "UPDATE":
                    return {
                        ...state,
                        error: action.error,
                        isFetching: false
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
                        users: action.data
                    };
                case "GETONEID":
                    return {
                        ...state,
                        isFetching: false,
                        err: null,
                        user: action.data
                    };
                case "CREATE":
                    return {
                        isFetching: false,
                        err: null,
                        users: [...state.data, action.data]
                    };
                case "DELETE":
                    return {
                        isFetching: false,
                        err: null,
                        users: state.data.filter(
                            obj => obj._id !== action.data._id
                        )
                    };
                case "UPDATE":
                    return {
                        isFetching: false,
                        err: null,
                        users: [
                            ...state.data.slice(
                                0,
                                state.data.findIndex(
                                    obj => obj._id === action.data._id
                                )
                            ),
                            action.data,
                            ...state.slice(
                                state.data.findIndex(
                                    obj => obj._id === action.data._id
                                ) + 1
                            )
                        ]
                    };
                default:
                    return state;
            }

        default:
            return state;
    }
};

export default users;
