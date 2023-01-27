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

export const AddHearts = (newAllPost) => {
  return {
    type: `ADD_HEART`,
    result: newAllPost,
  };
};

export const LoadProfile = (result) => {
  return {
    type: `LOAD_POST`,
    result: result,
  };
};
