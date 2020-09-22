import React from "react";
import Heart from "../../assets/heart.png";
import ThumbsUp from "../../assets/thumb-up.png";
import ThumbsDown from "../../assets/thumb-down.png";

const Post = ({ post, addLikes, addComment, disLikes, hearts, setComment }) => {
  console.log(post);
  return (
    <React.Fragment>
      <div
        key={post._id}
        style={{ borderRadius: "0.25rem", flexDirection: "column-reverse" }}
        className="container bg-dark mt-3 mb-3 p-3"
      >
        <h3 className="mb-3">{post.title}</h3>
        <div className="icon-container">
          <p>{post.likes}</p>
          <img
            height="15px"
            src={ThumbsUp}
            alt=""
            onClick={() => addLikes(post._id, post.likes)}
          />
          <p>{post.dislikes}</p>
          <img
            height="15px"
            src={ThumbsDown}
            alt=""
            onClick={() => disLikes(post._id, post.dislikes)}
          />
          <p>{post.hearts}</p>
          <img
            height="15px"
            src={Heart}
            alt=""
            onClick={() => hearts(post._id, post.hearts)}
          />
        </div>
        <div className="input-group mb-3 mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="comment"
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <div className="button-container text-center mt-3 mb-3">
          <button
            style={{ width: "100%" }}
            className="btn btn-primary"
            onClick={(event) => {
              event.preventDefault();
              addComment(post._id, post.comments);
            }}
          >
            Add Comment
          </button>
        </div>
        {post.comments.map((comment) => (
          <div
            key={comment.id}
            className="container p-3 mb-2"
            style={{ borderRadius: "0.25rem" }}
          >
            {comment.comments}
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default Post;
