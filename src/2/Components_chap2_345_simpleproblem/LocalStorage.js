export const loadState = () => {
    try {
        const serializedState = localStorage.getItem("state");
        if (serializedState === null) {
            return null;
        }
        console.log("we did it", serializedState);
        return JSON.parse(serializedState);
    } catch (err) {
        return null;
    }
};

export const saveState = state => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("state", serializedState);
        console.log("save state");
    } catch (err) {
        console.log("err");
    }
};

export const removeState = () => {
    try {
        localStorage.removeItem("state");
    } catch (err) {
        console.log(err);
    }
};
