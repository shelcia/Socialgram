import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { AddPost, LoadPost } from "../../data/actions";
import Post from "./components/Post";
import Loading from "../../components/CustomLoading";

import { Box, Button, Typography } from "@mui/material";
import { apiPost } from "../../services/models/postModel";

import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // I

const Feed = () => {
  const userid = localStorage.getItem("SocialGramUserId");

  // const postText = useRef("");
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState("");
  const [commentText, setCommentText] = useState("");

  const allPost = useSelector((state) => state.posts);
  // console.table(allPost);
  const dispatch = useDispatch();

  const getPost = async (dispatch, signal) => {
    try {
      apiPost.getSingle(``, signal, "").then((res) => {
        // console.log(res);
        if (Array.isArray(res.message) && res.status === "200") {
          dispatch(LoadPost(res.message));
          setIsLoading(false);
        }
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
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
    event.preventDefault();
    if (post === "") {
      toast.error("Post cannot be empty🥺🥺!");
      return;
    }
    addingNotif();

    const body = {
      id: Date.now(),
      userId: userid,
      ownerId: userid,
      title: post,
      fires: 0,
      fired: [],
      comments: [],
    };

    // console.log(body);

    apiPost.post(body, "").then(() => {
      dispatch(AddPost(body));
    });

    setPost("");
  };

  const addComment = (id, value) => {
    // user id , post id, comment content
    if (!commentText || commentText === "") {
      toast.error("Comment cannot be empty 🥺🥺!");
      return;
    }
    addingNotif();

    const commentId = Date.now();
    const response = {
      commentId: commentId,
      userId: userid,
      comments: commentText,
    };
    setCommentText("");
    apiPost
      .put(response, `comments/${id}`)
      .then((res) => {
        console.log(res);
        getPost(dispatch, undefined);
      })
      .catch(() => toast.error('Oops! The comment couldn"t be added 🥺🥺!!'));
  };

  const handleFires = (id) => {
    addingNotif();
    const response = {
      userId: userid,
    };
    apiPost
      .put(response, `fires/${id}`)
      .then((res) => {
        // console.log(res);
        getPost(dispatch, undefined);
      })
      .catch(() => toast.error('Oops! The fire couldn"t be added 🥺🥺!!'));
  };

  return (
    <React.Fragment>
      <InputForm addPost={addPost} setPost={setPost} />
      <Box sx={{ flexDirection: "column", display: "flex" }}>
        {isLoading ? (
          <Loading />
        ) : (
          allPost?.map((post) => (
            <Post
              key={post.id}
              userid={userid}
              post={post}
              handleFires={handleFires}
              addComment={addComment}
              commentText={commentText}
              setCommentText={setCommentText}
            />
          ))
        )}
      </Box>
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
        color="info"
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
