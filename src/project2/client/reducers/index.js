import { combineReducers } from "redux";
import users from "./users";
import page from "./page";

const reducers = combineReducers({
    users
});

export default reducers;
