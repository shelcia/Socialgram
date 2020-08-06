import React, { useState } from "react";
import "./App.css";
import SideNav from "./components/SideNav";
import Adds from "./components/Adds";
import Heart from "./assets/heart.png";
import ThumbsUp from "./assets/thumb-up.png";
import ThumbsDown from "./assets/thumb-down.png";

const App = () => {
  const [post, setPost] = useState("");
  const [allPost, setAllPost] = useState([]);
  const [comment, setComment] = useState("");
  const [allComment, setAllComment] = useState([]);

  const addPost = (event) => {
    event.preventDefault();
    setAllPost((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: post,
        likes: 0,
        dislikes: 0,
        hearts: 0,
        comments: [],
      },
    ]);
  };
  const addComment = (id) => {
    console.log(allPost);
    console.log(id);
    allPost.map((post) => {
      if (post.id === id) {
        post.comments = [...post.comments, { id: Date.now(), title: comment }];
        setAllComment((prev) => [
          ...prev,
          { id: Date.now(), comments: comment },
        ]);
      }
    });
  };
  const addLikes = (id) => {
    console.log(allPost);
    console.log(id);
    allPost.map((post) => {
      if (post.id === id) {
        post.likes = post.likes + 1;
        setAllComment((prev) => [
          ...prev,
          { id: Date.now(), comments: comment },
        ]);
      }
    });
  };
  const disLikes = (id) => {
    console.log(allPost);
    console.log(id);
    allPost.map((post) => {
      if (post.id === id) {
        post.dislikes = post.dislikes + 1;
        setAllComment((prev) => [
          ...prev,
          { id: Date.now(), comments: comment },
        ]);
      }
    });
  };
  const hearts = (id) => {
    console.log(allPost);
    console.log(id);
    allPost.map((post) => {
      if (post.id === id) {
        post.hearts = post.hearts + 1;
        setAllComment((prev) => [
          ...prev,
          { id: Date.now(), comments: comment },
        ]);
      }
    });
  };
  return (
    <React.Fragment>
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="#!">
          Home
        </a>
      </nav>
      <div className="container">
        <div className="row mt-5">
          <SideNav />
          <div className="col-sm-6">
            <h3>What's on your mind?</h3>
            <div className="input-group-lg">
              <textarea
                className="form-control"
                aria-label="With textarea"
                placeholder="enter your thoughts"
                onChange={(event) => setPost(event.target.value)}
              ></textarea>
            </div>
            <div className="button-container text-center mt-3 mb-5">
              <button
                style={{ width: "100%" }}
                className="btn btn-primary"
                onClick={(event) => addPost(event)}
              >
                Add Post
              </button>
            </div>
            {allPost.map((post) => (
              <div
                key={post.id}
                style={{ borderRadius: "0.25rem" }}
                className="container bg-dark mt-3 mb-3 p-3"
              >
                <h3 className="mb-3">{post.title}</h3>
                <div className="icon-container">
                  <p>{post.likes}</p>
                  <img
                    height="15px"
                    src={ThumbsUp}
                    alt=""
                    onClick={() => addLikes(post.id)}
                  />
                  <p>{post.dislikes}</p>
                  <img
                    height="15px"
                    src={ThumbsDown}
                    alt=""
                    onClick={() => disLikes(post.id)}
                  />
                  <p>{post.hearts}</p>
                  <img
                    height="15px"
                    src={Heart}
                    alt=""
                    onClick={() => hearts(post.id)}
                  />
                </div>
                <div className="input-group mb-3 mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="comment"
                    aria-label="comment"
                    aria-describedby="basic-addon1"
                    onChange={(event) => setComment(event.target.value)}
                  />
                </div>
                <div className="button-container text-center mt-3 mb-3">
                  <button
                    style={{ width: "100%" }}
                    className="btn btn-primary"
                    onClick={(event) => {
                      event.preventDefault();
                      addComment(post.id);
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
                    {comment.title}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <Adds />
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
