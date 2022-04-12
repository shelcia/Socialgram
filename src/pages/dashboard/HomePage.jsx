import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { AddPost, LoadPost } from "../../data/actions";
import { apiPlain } from "../../services/models/plainModel";
import SideNav from "../../common/SideNav";
import Adds from "../../common/Add";
import Post from "./components/Post";

const Feed = () => {
  const postText = useRef("");
  const [commentText, setCommentText] = useState("");

  const allPost = useSelector((state) => state.posts);
  // console.table(allPost);
  const dispatch = useDispatch();

  const getPost = async (dispatch, signal) => {
    try {
      apiPlain.getSingle(`post`, signal, "").then((res) => {
        //   console.log(res);
        dispatch(LoadPost(res));
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const ac = new AbortController();
    getPost(dispatch, ac.signal);
    return () => ac.abort();
  }, [dispatch]);

  //   const errorNotify = (message) => {
  //     toast.error(message);
  //   };

  const addingNotif = () => {
    toast("Adding!", {
      icon: "👏",
    });
  };

  const addPost = async (event) => {
    addingNotif();
    event.preventDefault();
    const userid = localStorage.getItem("SocialGramUserId");
    const body = {
      id: Date.now(),
      userId: userid,
      title: postText.current.value,
      likes: 0,
      dislikes: 0,
      hearts: 0,
      comments: [],
    };
    if (body.title === "") {
      toast.error("Post cannot be empty🥺🥺!");
      return;
    }

    apiPlain.post(body, "post").then(() => {
      dispatch(AddPost(body));
    });

    postText.current.value = null;
  };

  const addComment = (id, value) => {
    if (!commentText) {
      toast.error("Comment cannot be empty 🥺🥺!");
      return;
    }
    addingNotif();

    const commentId = Date.now();
    const response = {
      comments: value.concat({
        id: commentId,
        comments: commentText,
      }),
    };
    setCommentText("");
    apiPlain.put(response, `comments/${id}`).then((res) => {
      //   console.log(res);
      getPost(dispatch, undefined).catch(() =>
        toast.error('Oops! The comment couldn"t be added 🥺🥺!!')
      );
    });
  };

  const addLikes = (id, value) => {
    addingNotif();
    const response = {
      likes: value + 1,
    };
    apiPlain
      .put(response, `likes/${id}`)
      .then((res) => {
        // console.log(res);
        getPost(dispatch, undefined);
      })
      .catch(() => toast.error('Oops! The like couldn"t be added 🥺🥺!!'));
  };

  const disLikes = (id, value) => {
    addingNotif();
    const response = {
      dislikes: value + 1,
    };
    apiPlain
      .put(response, `dislikes/${id}`)
      .then((res) => {
        // console.log(res);
        getPost(dispatch, undefined);
      })
      .catch(() => toast.error('Oops! The dislike couldn"t be added 🥺🥺!!'));
  };

  const hearts = (id, value) => {
    addingNotif();
    const response = {
      hearts: value + 1,
    };
    apiPlain
      .put(response, `hearts/${id}`)
      .then((res) => {
        // console.log(res);
        getPost(dispatch, undefined);
      })
      .catch(() => toast.error('Oops! The heart couldn"t be added 🥺🥺!!'));
  };

  return (
    <React.Fragment>
      <div className="row">
        <SideNav />
        <div className="col-sm-6">
          <InputForm addPost={addPost} postText={postText} />
          <div style={{ flexDirection: "column-reverse" }} className="d-flex">
            {allPost?.map((post) => (
              <Post
                key={post.id}
                post={post}
                addLikes={addLikes}
                addComment={addComment}
                disLikes={disLikes}
                hearts={hearts}
                commentText={commentText}
                setCommentText={setCommentText}
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

const InputForm = ({ addPost, postText }) => {
  return (
    <React.Fragment>
      <h3 className="mb-3">What's on your mind?</h3>
      <div className="input-group-lg">
        <textarea
          className="form-control"
          placeholder="share your thoughts"
          ref={postText}
          required
        ></textarea>
      </div>
      <div className="button-container text-center mt-3 mb-5">
        <button
          style={{ width: "100%" }}
          className="btn btn-primary"
          onClick={(event) => {
            addPost(event);
          }}
        >
          Add Post
        </button>
      </div>
    </React.Fragment>
  );
};
