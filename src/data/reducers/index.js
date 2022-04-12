import postReducer from "./postReducer";
import dummyReducer from "./DummyReducer";

import { combineReducers } from "redux";

const rootReducers = combineReducers({
  posts: postReducer,
  dummy: dummyReducer,
});

export default rootReducers;
