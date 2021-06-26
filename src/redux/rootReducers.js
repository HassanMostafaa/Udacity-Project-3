import { combineReducers } from "redux";
import userReducer from "./users/userReducers";
import currentUserReducer from "./currentUser/currentUserReducer";
import questionsReducer from "./questions/questionsReducer";

const rootReducer = combineReducers({
  userReducer,
  currentUserReducer,
  questionsReducer,
});

export default rootReducer;
