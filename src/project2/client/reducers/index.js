import { combineReducers } from "redux";
import users from "./users";
import dropdown from "./dropdown";
const reducers = combineReducers({
    users,
    dropdown
});

export default reducers;
