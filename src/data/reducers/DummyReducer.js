const dummyReducer = (state = [], action) => {
  switch (action.type) {
    case "LOAD_NOTHING":
      return action.result;
    default:
      return state;
  }
};

export default dummyReducer;
