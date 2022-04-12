export const LoadPost = (result) => {
  return {
    type: `LOAD_POST`,
    result: result,
  };
};
export const AddPost = (newPost) => {
  return {
    type: `ADD_POST`,
    result: newPost,
  };
};

export const AddComment = (newAllPost) => {
  return {
    type: `ADD_COMMENT`,
    result: newAllPost,
  };
};

export const AddLike = (newAllPost) => {
  return {
    type: `ADD_LIKE`,
    result: newAllPost,
  };
};

export const AddDislike = (newAllPost) => {
  return {
    type: `ADD_DISLIKE`,
    result: newAllPost,
  };
};

export const AddHearts = (newAllPost) => {
  return {
    type: `ADD_HEART`,
    result: newAllPost,
  };
};
