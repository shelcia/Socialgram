import React, { useEffect, useState } from "react";
import ReactEmoji from "react-emoji";

const Post = ({
  post,
  addLikes,
  addComment,
  disLikes,
  hearts,
  commentText,
  setCommentText,
}) => {
  const convertDate = (date) => {
    const dates = new Date(date);
    const formattedDate = Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }).format(dates);
    return formattedDate;
  };

  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchIds = async () => {
      try {
        const LINK = process.env.REACT_APP_HEROKU_LINK;
        const response = await fetch(`${LINK}userId`);
        const ids = await response.json();
        console.log(post._id, ids);
        const userData = await ids.filter((ids) => ids._id === post.userId);
        console.log(userData);
        if (userData.length) {
          setUser(userData[0].fname);
        } else {
          setUser("Deleted User");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchIds();
  }, [post._id, post.userId]);

  return (
    <React.Fragment>
      <div
        key={post.id}
        className="container bg-dark mt-3 mb-3 p-3 post rounded"
      >
        <h3 className="mb-3">{ReactEmoji.emojify(post.title)}</h3>
        <div className="my-4 d-flex justify-content-between">
          <p className="text-muted">Posted By: {user}</p>
          <p className="text-muted">
            {post.date ? convertDate(post.date) : "Just now"}
          </p>
        </div>
        <div className="icon-container d-flex">
          <div className="icons" title="like">
            <i
              className="fas fa-thumbs-up pr-4"
              onClick={() => addLikes(post.id, post.likes)}
            ></i>
            <span>{post.likes}</span>
          </div>
          <div className="icons" title="dislike">
            <i
              className="fas fa-thumbs-down pr-4"
              onClick={() => disLikes(post.id, post.dislikes)}
            ></i>
            <span>{post.dislikes}</span>
          </div>
          <div className="icons hearts" title="heart">
            <i
              className="fas fa-heart pr-4"
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
        <div style={{ maxHeight: "20vh", overflowY: "auto" }}>
          {post.comments.map((comment) => (
            <div
              key={comment.id}
              className="container p-3 mb-2 shadow-lg rounded-lg"
            >
              {ReactEmoji.emojify(comment.comments)}
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Post;

// import Heart from "../../assets/heart.png";
// import ThumbsUp from "../../assets/thumb-up.png";
// import ThumbsDown from "../../assets/thumb-down.png";

// {/* <img
//             height="15px"
//             src={ThumbsUp}
//             alt=""
//             onClick={() => addLikes(post.id, post.likes)}
//           /> */}

// {/* <img
//             height="15px"
//             src={ThumbsDown}
//             alt=""
//             onClick={() => disLikes(post.id, post.dislikes)}
//           /> */}

// {/* <img
//             height="15px"
//             src={Heart}
//             alt=""
//             onClick={() => hearts(post.id, post.hearts)}
//           /> */}
