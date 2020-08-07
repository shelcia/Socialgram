import React, { useState, useEffect } from "react";
import axios from "axios";
import Heart from "../assets/heart.png";
import ThumbsUp from "../assets/thumb-up.png";
import ThumbsDown from "../assets/thumb-down.png";

const Feed = () => {
  const [post, setPost] = useState("");
  const [allPost, setAllPost] = useState([]);
  const [comment, setComment] = useState("");
  const [allComment, setAllComment] = useState([]);
  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    try {
      const posts = await fetch("https://fb-clone-backend.herokuapp.com/post");
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
      await fetch("https://fb-clone-backend.herokuapp.com/post", {
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
  const addComment = (id, value) => {
    const response = {
      comments: value.concat({ id: Date.now(), comments: comment }),
    };
    console.log(response);
    allPost.map((post) => {
      if (post._id === id) {
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
    axios
      .put(`https://fb-clone-backend.herokuapp.com/comments/${id}`, response)
      .then((res) => console.log(res.json()))
      .catch((error) => {
        console.log(error);
      });
  };
  const addLikes = (id, value) => {
    const response = {
      likes: value + 1,
    };
    axios
      .put(`https://fb-clone-backend.herokuapp.com/likes/${id}`, response)
      .then((res) =>
        allPost.map((post) => {
          if (post._id === id) {
            post.likes = post.likes + 1;
            setAllComment((prev) => [
              ...prev,
              { id: Date.now(), comments: comment },
            ]);
          }
        })
      )
      .catch((error) => {
        console.log(error);
      });
  };
  const disLikes = (id, value) => {
    const response = {
      dislikes: value + 1,
    };
    axios
      .put(`https://fb-clone-backend.herokuapp.com/dislikes/${id}`, response)
      .then((res) =>
        allPost.map((post) => {
          if (post._id === id) {
            post.dislikes = post.dislikes + 1;
            setAllComment((prev) => [
              ...prev,
              { id: Date.now(), comments: comment },
            ]);
          }
        })
      )
      .catch((error) => {
        console.log(error);
      });
  };
  const hearts = (id, value) => {
    console.log(id);
    const response = {
      hearts: value + 1,
    };
    axios
      .put(`https://fb-clone-backend.herokuapp.com/hearts/${id}`, response)
      .then((res) =>
        allPost.map((post) => {
          if (post._id === id) {
            post.hearts = post.hearts + 1;
            setAllComment((prev) => [
              ...prev,
              { id: Date.now(), comments: comment },
            ]);
          }
        })
      )
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <React.Fragment>
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
        ))}
      </div>
    </React.Fragment>
  );
};

export default Feed;
