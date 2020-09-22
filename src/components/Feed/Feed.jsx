import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import InputForm from "./InputFrom";
import Post from "./Post";
import { useSelector, useDispatch } from "react-redux";
import { LoadPost, AddPost, AddComment } from "../actions/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Feed = () => {
  const [comment, setComment] = useState("");
  const [allComment, setAllComment] = useState([]);
  const LINK = process.env.REACT_APP_HEROKU_LINK;

  const postText = useRef("");

  const allPost = useSelector((state) => state.posts);
  console.table(allPost);
  const dispatch = useDispatch();

  useEffect(() => {
    const getPost = async () => {
      try {
        const posts = await fetch(`${LINK}post`);
        dispatch(LoadPost(await posts.json()));
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, [LINK, dispatch]);

  const errorNotify = (message) => {
    toast.error(message);
  };

  const addPost = async (event) => {
    event.preventDefault();
    const response = {
      id: Date.now(),
      title: postText.current.value,
      likes: 0,
      dislikes: 0,
      hearts: 0,
      comments: [],
    };
    try {
      await fetch(`${LINK}post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(response),
      });
      dispatch(AddPost(response.id, postText.current.value));
    } catch (error) {
      console.log(error);
      errorNotify('Oops! The post couldn"t be added 🥺🥺!!');
    }
  };
  const addComment = useCallback(
    (id, value) => {
      const response = {
        comments: value.concat({ id: Date.now(), comments: comment }),
      };
      console.log(response);
      dispatch(AddComment(id, value));
      axios
        .put(`${LINK}comments/${id}`, response)
        .then((res) => console.log(res))
        .catch((error) => {
          console.log(error);
          errorNotify('Oops! The comment couldn"t be added 🥺🥺!!');
        });
    },
    [LINK, comment, dispatch]
  );
  const addLikes = useCallback(
    (id, value) => {
      const response = {
        likes: value + 1,
      };
      axios
        .put(`${LINK}likes/${id}`, response)
        .then((res) =>
          allPost.map((post) => {
            if (post.id === id) {
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
    },
    [LINK, allPost, comment]
  );
  const disLikes = useCallback(
    (id, value) => {
      console.log("clicked");
      const response = {
        dislikes: value + 1,
      };
      axios
        .put(`${LINK}dislikes/${id}`, response)
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
    },
    [LINK, allPost, comment]
  );
  const hearts = useCallback(
    (id, value) => {
      console.log(id);
      const response = {
        hearts: value + 1,
      };
      axios
        .put(`${LINK}hearts/${id}`, response)
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
    },
    [LINK, allPost, comment]
  );
  return (
    <React.Fragment>
      <ToastContainer />
      <div className="col-sm-6">
        <InputForm addPost={addPost} postText={postText} />
        {allPost.map((post) => (
          <Post
            key={post.id}
            post={post}
            addLikes={addLikes}
            addComment={addComment}
            disLikes={disLikes}
            hearts={hearts}
            setComment={setComment}
          />
        ))}
      </div>
    </React.Fragment>
  );
};

export default Feed;
// REACT_APP_HEROKU_LINK = https://fb-clone-backend.herokuapp.com/
