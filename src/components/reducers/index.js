import postReducer from "./postReducer";
import { combineReducers } from "redux";

const rootReducers = combineReducers({
  posts: postReducer,
  post: postReducer,
});

export default rootReducers;
