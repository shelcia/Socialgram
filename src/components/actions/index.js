export const LoadPost = (result) => {
  return {
    type: `LOAD_POST`,
    result: result,
  };
};
export const AddPost = (id, post) => {
  console.log(id);
  return {
    type: `ADD_POST`,
    id: id,
    title: post,
  };
};

export const AddComment = (id, comment) => {
  return {
    type: `ADD_COMMENT`,
    id: id,
    title: comment,
  };
};
