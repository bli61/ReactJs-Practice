const iniState = { isFetching: false, data: {}, err: null };

const dropdown = (state = iniState, action) => {
    switch (action.type) {
        case "USER_FETCH_START":
            return {
                ...state,
                isFetching: true
            };
        case "USER_FETCH_FAIL":
            return {
                ...state,
                error: action.error,
                isFetching: false
            };
        case "USER_FETCH_SUCCESS":
            return {
                ...state,
                isFetching: false,
                err: null,
                data: action.data
            };
        default:
            return state;
    }
};

export default dropdown;
