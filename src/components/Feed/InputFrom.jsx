import React from "react";

const InputForm = ({ addPost, postText }) => {
  return (
    <React.Fragment>
      <h3 className="mb-3">What's on your mind?</h3>
      <div className="input-group-lg">
        <textarea
          className="form-control"
          placeholder="share your thoughts"
          ref={postText}
          required
        ></textarea>
      </div>
      <div className="button-container text-center mt-3 mb-5">
        <button
          style={{ width: "100%" }}
          className="btn btn-primary"
          onClick={(event) => {
            addPost(event);
          }}
        >
          Add Post
        </button>
      </div>
    </React.Fragment>
  );
};

export default InputForm;
