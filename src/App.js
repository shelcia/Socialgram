import React, { useState, useEffect } from "react";
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
  const [likes, setLikes] = useState();
  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    try {
      const posts = await fetch("http://localhost:4050/post");
      const result = await posts.json();
      setAllPost(result);
    } catch (error) {
      console.log(error);
    }
  };
  const addPost = async (event) => {
    event.preventDefault();
    const response = {
      title: post,
      likes: 0,
      dislikes: 0,
      hearts: 0,
      comments: [],
    };
    try {
      await fetch("http://localhost:4050/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(response),
      });
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
    } catch (error) {
      console.log(error);
    }
  };
  const addComment = (id) => {
    console.log(allPost);
    console.log(id);
    allPost.map((post) => {
      if (post.id === id) {
        post.comments = [
          ...post.comments,
          { id: Date.now(), comments: comment },
        ];
        setAllComment((prev) => [
          ...prev,
          { id: Date.now(), comments: comment },
        ]);
      }
    });
  };
  const addLikes = (id) => {
    const like = likes + 1;
    setLikes(like);
    console.log(allPost);
    console.log(id);
    const response = {
      likes: likes,
    };

    allPost.map((post) => {
      if (post._id === id) {
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
                key={post._id}
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
                    onClick={() => addLikes(post._id)}
                  />
                  <p>{post.dislikes}</p>
                  <img
                    height="15px"
                    src={ThumbsDown}
                    alt=""
                    onClick={() => disLikes(post._id)}
                  />
                  <p>{post.hearts}</p>
                  <img
                    height="15px"
                    src={Heart}
                    alt=""
                    onClick={() => hearts(post._id)}
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
                    {comment.comments}
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
