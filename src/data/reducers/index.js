import postReducer from "./postReducer";
import profileReducer from "./profileReducer";

import { combineReducers } from "redux";

const rootReducers = combineReducers({
  posts: postReducer,
  profile: profileReducer,
});

export default rootReducers;
