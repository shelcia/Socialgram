const postReducer = (state = [], action) => {
  switch (action.type) {
    case "LOAD_POST":
      return action.result;
    case "ADD_POST":
      return [
        ...state,
        { title: action.title, likes: 0, dislikes: 0, hearts: 0, comments: [] },
      ];
    default:
      return state;
  }
};

export default postReducer;

// case "ADD_POST":
//   return [...state].filter((service) => service._id !== action.id);
