const postReducer = (state = [], action) => {
  switch (action.type) {
    case "LOAD_POST":
      return action.result;
    case "ADD_POST":
      return [
        ...state,
        {
          id: action.id,
          title: action.title,
          likes: 0,
          dislikes: 0,
          hearts: 0,
          comments: [],
        },
      ];
    case "ADD_COMMENT":
      return action.result;
    case "ADD_LIKE":
      return action.result;
    case "ADD_DISLIKE":
      return action.result;
    case "ADD_HEART":
      return action.result;
    default:
      return state;
  }
};

export default postReducer;

// case "ADD_POST":
//   return [...state].filter((service) => service._id !== action.id);
