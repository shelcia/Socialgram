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
      console.log(state);
      state.map((post) => {
        if (post.id === action.id) {
          console.log(post.id, action.title);
        } else {
          console.log("not found");
        }
      });

      return state;
    default:
      return state;
  }
};

export default postReducer;

// case "ADD_POST":
//   return [...state].filter((service) => service._id !== action.id);
