import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import InputForm from "./InputFrom";
import Post from "./Post";
import { useSelector, useDispatch } from "react-redux";
import { LoadPost, AddPost } from "../actions/index";

const Feed = () => {
  const [allPost, setAllPost] = useState([]);
  const [comment, setComment] = useState("");
  const [allComment, setAllComment] = useState([]);
  const LINK = process.env.REACT_APP_HEROKU_LINK;
  const postText = useRef("");
  console.log(postText.current.value);

  useEffect(() => {
    getPost();
  }, []);

  const results = useSelector((state) => state.posts);
  console.table(results);
  const dispatch = useDispatch();

  const getPost = async () => {
    try {
      const posts = await fetch(`${LINK}post`);
      setAllPost(await posts.json());
      dispatch(LoadPost(await posts.json()));
    } catch (error) {
      console.log(error);
    }
  };
  const addPost = async (event) => {
    event.preventDefault();
    const response = {
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
      dispatch(AddPost(postText));
      // setAllPost((prev) => [
      //   ...prev,
      //   {
      //     title: postText.current.value,
      //     likes: 0,
      //     dislikes: 0,
      //     hearts: 0,
      //     comments: [],
      //   },
      // ]);
    } catch (error) {
      console.log(error);
    }
  };
  const addComment = useCallback(
    (id, value) => {
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
        .put(`${LINK}comments/${id}`, response)
        .then((res) => console.log(res.json()))
        .catch((error) => {
          console.log(error);
        });
    },
    [LINK, allPost, comment]
  );
  const addLikes = (id, value) => {
    const response = {
      likes: value + 1,
    };
    axios
      .put(`${LINK}likes/${id}`, response)
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
  };
  const hearts = (id, value) => {
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
  };
  return (
    <React.Fragment>
      <div className="col-sm-6">
        <InputForm addPost={addPost} postText={postText} />
        {allPost.map((post) => (
          <Post
            key={post.date}
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
