import React from "react";
import Heart from "../../assets/heart.png";
import ThumbsUp from "../../assets/thumb-up.png";
import ThumbsDown from "../../assets/thumb-down.png";
import ReactEmoji from "react-emoji";

const Post = ({
  post,
  addLikes,
  addComment,
  disLikes,
  hearts,
  commentText,
}) => {
  console.log(post);
  return (
    <React.Fragment>
      <div
        key={post.id}
        style={{ borderRadius: "0.25rem", flexDirection: "column-reverse" }}
        className="container bg-dark mt-3 mb-3 p-3"
      >
        <h3 className="mb-3">{ReactEmoji.emojify(post.title)}</h3>
        <div className="icon-container">
          <p>{post.likes}</p>
          <img
            height="15px"
            src={ThumbsUp}
            alt=""
            onClick={() => addLikes(post.id, post.likes)}
          />
          <p>{post.dislikes}</p>
          <img
            height="15px"
            src={ThumbsDown}
            alt=""
            onClick={() => disLikes(post.id, post.dislikes)}
          />
          <p>{post.hearts}</p>
          <img
            height="15px"
            src={Heart}
            alt=""
            onClick={() => hearts(post.id, post.hearts)}
          />
        </div>
        <div className="input-group mb-3 mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="comment"
            ref={commentText}
            // onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <div className="button-container text-center mt-3 mb-3">
          <button
            style={{ width: "100%" }}
            className="btn btn-primary"
            onClick={(event) => {
              event.preventDefault();
              addComment(post.id, post.comments);
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
            {ReactEmoji.emojify(comment.comments)}
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default Post;
