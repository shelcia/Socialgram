export const LoadPost = (result) => {
  return {
    type: `LOAD_POST`,
    result: result,
  };
};
export const AddPost = (post) => {
  return {
    type: `ADD_POST`,
    post: post,
  };
};

//   export const DelService = (id) => {
//     return {
//       type: `DEL_SERVICE_REQUEST`,
//       id: id,
//     };
//   };
