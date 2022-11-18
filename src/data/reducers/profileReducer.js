const profileReducer = (state = [], action) => {
  switch (action.type) {
    case "LOAD_PROFILE":
      return action.result;
    default:
      return state;
  }
};

export default profileReducer;
