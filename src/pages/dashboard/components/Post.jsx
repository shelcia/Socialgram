import React, { useEffect, useState } from "react";
import { convertDate } from "../../../helpers/convert";
import { apiPlain } from "../../../services/models/plainModel";
import parse from "html-react-parser";

const Post = ({
  post,
  addLikes,
  addComment,
  disLikes,
  hearts,
  commentText,
  setCommentText,
}) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const ac = new AbortController();
    const fetchIds = async () => {
      try {
        apiPlain.getSingle(`userId`, ac.signal, "").then((res) => {
          if (!Array.isArray(res)) {
            return;
          }
          const userData = res?.filter((ids) => ids._id === post.userId);
          if (userData?.length) {
            setUser(userData[0]?.fname);
          } else {
            setUser("Deleted User");
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchIds();
    return () => ac.abort();
  }, [post._id, post.userId, post]);

  return (
    <React.Fragment>
      <div
        key={post.id}
        className="container bg-dark mt-3 mb-3 p-3 post rounded"
      >
        <h3 className="mb-3">{parse(post.title)}</h3>
        <div className="my-4 d-flex justify-content-between">
          <p className="text-muted">Posted By: {user}</p>
          <p className="text-muted">
            {post.date ? convertDate(post.date) : "Just now"}
          </p>
        </div>
        <div className="icon-container d-flex">
          <div className="icons" title="like">
            <i
              className="fas fa-thumbs-up pe-4"
              onClick={() => addLikes(post.id, post.likes)}
            ></i>
            <span>{post.likes}</span>
          </div>
          <div className="icons" title="dislike">
            <i
              className="fas fa-thumbs-down pe-4"
              onClick={() => disLikes(post.id, post.dislikes)}
            ></i>
            <span>{post.dislikes}</span>
          </div>
          <div className="icons hearts" title="heart">
            <i
              className="fas fa-heart pe-4"
              onClick={() => hearts(post.id, post.hearts)}
            ></i>
            <span>{post.hearts}</span>
          </div>
        </div>
        <div className="input-group mb-3 mt-3">
          <form className="w-100">
            <div className="form-group w-100">
              <input
                type="text"
                className="form-control w-100"
                placeholder="comment"
                value={commentText}
                onChange={(event) => setCommentText(event.target.value)}
                required
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
          </form>
        </div>
        <div
          style={{ maxHeight: "20vh", overflowY: "auto" }}
          className="d-flex flex-column-reverse"
        >
          {post.comments.map((comment) => (
            <div
              key={comment.id}
              className="container p-3 mb-2 shadow-lg rounded-lg w-100"
            >
              {parse(comment.comments)}
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Post;
