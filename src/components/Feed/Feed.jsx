import React, { useEffect, useCallback, useRef } from "react";
import axios from "axios";
import InputForm from "./InputFrom";
import Adds from "../HomPage/Adds";
import SideNav from "../HomPage/SideNav";
import Post from "./Post";
import { useSelector, useDispatch } from "react-redux";
import {
  LoadPost,
  AddPost,
  AddComment,
  AddLike,
  AddDislike,
  AddHearts,
} from "../actions/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Feed = () => {
  const LINK = process.env.REACT_APP_HEROKU_LINK;

  const postText = useRef("");
  const commentText = useRef("");

  const allPost = useSelector((state) => state.posts);
  // console.table(allPost);
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
    const userid = localStorage.getItem("SocialGramUserId");
    const response = {
      id: Date.now(),
      userId: userid,
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
      dispatch(AddPost(response));
      postText.current.value = null;
    } catch (error) {
      console.log(error);
      errorNotify('Oops! The post couldn"t be added 🥺🥺!!');
      postText.current.value = null;
    }
  };

  const addComment = useCallback(
    (id, value) => {
      console.log("executed");
      const commentId = Date.now();
      const response = {
        comments: value.concat({
          id: commentId,
          comments: commentText.current.value,
        }),
      };
      console.log(response);
      axios
        .put(`${LINK}comments/${id}`, response)
        .then((res) => {
          const newAllPost = allPost.map((post) => {
            if (post.id === id) {
              const updatedPost = {
                ...post,
                comments: [
                  ...post.comments,
                  { id: commentId, comments: commentText.current.value },
                ],
              };
              return updatedPost;
            }
            return post;
          });
          dispatch(AddComment(newAllPost));
          console.log(res);
          // commentText.current.value = null;
        })
        .catch((error) => {
          console.log(error);
          errorNotify('Oops! The comment couldn"t be added 🥺🥺!!');
          // commentText.current.value = null;
        });
    },
    [LINK, allPost, dispatch]
  );

  let likesData = [];
  const addLikes = useCallback(
    (id, value) => {
      let response = {
        likes: value + 1,
      };
      likesData = JSON.parse(localStorage.getItem('likeIDS')) || [];
            
      if (JSON.parse(localStorage.getItem('likeIDS')).includes(id)) {
        response = {
          likes: value,
        };
      }
      axios
        .put(`${LINK}likes/${id}`, response)
        .then((res) => {
          const newAllPost = allPost.map((post) => {
            if (post.id === id) {
              const updatedPost = {
                ...post,
                likes: response.likes,
              };
              return updatedPost;
            }
            return post;
          });
          dispatch(AddLike(newAllPost));
          console.log(res);
          if (!JSON.parse(localStorage.getItem('likeIDS')).includes(id)) {
            likesData.push(id);            
          }
          localStorage.setItem('likeIDS', JSON.stringify(likesData));
        })
        .catch((error) => {
          console.log(error);
          errorNotify('Oops! The like couldn"t be added 🥺🥺!!');
        });
    },
    [LINK, allPost, dispatch]
  );

  let dislikesData = [];
  const disLikes = useCallback(
    (id, value) => {
      console.log("clicked");
      const response = {
        dislikes: value + 1,
      };

      dislikesData = JSON.parse(localStorage.getItem('dislikeIDS')) || [];
            
      if (JSON.parse(localStorage.getItem('dislikeIDS')).includes(id)) {
        response = {
          likes: value,
        };
      }

      axios
        .put(`${LINK}dislikes/${id}`, response)
        .then((res) => {
          const newAllPost = allPost.map((post) => {
            if (post.id === id) {
              const updatedPost = {
                ...post,
                dislikes: response.dislikes,
              };
              return updatedPost;
            }
            return post;
          });
          dispatch(AddDislike(newAllPost));
          console.log(res);
          if (!JSON.parse(localStorage.getItem('dislikeIDS')).includes(id)) {
            dislikesData.push(id);            
          }
          localStorage.setItem('dislikeIDS', JSON.stringify(dislikesData));
        })
        .catch((error) => {
          console.log(error);
          errorNotify('Oops! The dislike couldn"t be added 🥺🥺!!');
        });
    },
    [LINK, allPost, dispatch]
  );

  const hearts = useCallback(
    (id, value) => {
      console.log(id);
      const response = {
        hearts: value + 1,
      };
      axios
        .put(`${LINK}hearts/${id}`, response)
        .then((res) => {
          const newAllPost = allPost.map((post) => {
            if (post.id === id) {
              const updatedPost = {
                ...post,
                hearts: response.hearts,
              };
              return updatedPost;
            }
            return post;
          });
          dispatch(AddHearts(newAllPost));
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
          errorNotify('Oops! The heart couldn"t be added 🥺🥺!!');
        });
    },
    [LINK, allPost, dispatch]
  );
  return (
    <React.Fragment>
      <ToastContainer />
      <div className="row">
        <SideNav />
        <div className="col-sm-6">
          <InputForm addPost={addPost} postText={postText} />
          <div style={{ flexDirection: "column-reverse" }} className="d-flex">
            {allPost.map((post) => (
              <Post
                key={post.id}
                post={post}
                addLikes={addLikes}
                addComment={addComment}
                disLikes={disLikes}
                hearts={hearts}
                commentText={commentText}
              />
            ))}
          </div>
        </div>
        <Adds />
      </div>
    </React.Fragment>
  );
};

export default Feed;
// REACT_APP_HEROKU_LINK = https://fb-clone-backend.herokuapp.com/
