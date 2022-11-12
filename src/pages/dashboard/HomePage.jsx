import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { AddPost, LoadPost } from "../../data/actions";
import { apiPlain } from "../../services/models/plainModel";
import Post from "./components/Post";
import Loading from "../../components/Loading";

import { Box, Button, Typography } from "@mui/material";
import { apiPost } from "../../services/models/postModel";

import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // I

const Feed = () => {
  // const postText = useRef("");
  const [post, setPost] = useState("");
  const [commentText, setCommentText] = useState("");

  const allPost = useSelector((state) => state.posts);
  // console.table(allPost);
  const dispatch = useDispatch();

  const getPost = async (dispatch, signal) => {
    try {
      apiPost.getSingle(``, signal, "").then((res) => {
        console.log(res);
        if (Array.isArray(res.message) && res.status === "200") {
          dispatch(LoadPost(res.message));
        }
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
      title: post,
      likes: 0,
      dislikes: 0,
      hearts: 0,
      comments: [],
    };
    if (body.title === "") {
      toast.error("Post cannot be empty🥺🥺!");
      return;
    }

    apiPost.post(body, "").then(() => {
      dispatch(AddPost(body));
    });

    setPost("");
  };

  const addComment = (id, value) => {
    if (!commentText || commentText === "") {
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
    apiPost.put(response, `comments/${id}`).then((res) => {
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
      <InputForm addPost={addPost} setPost={setPost} />
      <div style={{ flexDirection: "column-reverse" }} className="d-flex">
        {allPost.length === 0 ? (
          <Loading />
        ) : (
          allPost?.map((post) => (
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
          ))
        )}
      </div>
    </React.Fragment>
  );
};

export default Feed;

const InputForm = ({ addPost, setPost }) => {
  const BUTTONLIST = [
    ["undo"],
    ["fontSize", "formatBlock"],
    ["bold", "underline", "italic", "strike"],
    ["removeFormat"],
    ["fontColor", "hiliteColor"],
    ["align", "list"],
    ["link", "image"],
  ];

  return (
    <React.Fragment>
      <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
        How about a thought ?
      </Typography>
      <Box className="input-group-lg">
        <SunEditor
          onChange={(content) => setPost(content)}
          placeholder="share your thoughts"
          setOptions={{
            buttonList: BUTTONLIST,
          }}
          autoFocus={true}
        />
      </Box>
      <Button
        variant="contained"
        onClick={(event) => {
          addPost(event);
        }}
        fullWidth
        size="small"
        className="my-3"
      >
        Add Post
      </Button>
    </React.Fragment>
  );
};
