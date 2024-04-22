import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { AddPost, LoadPost } from "../../data/actions";
import Post from "./components/Post";
import Loading from "../../components/CustomLoading";

import { Box, Button, Typography } from "@mui/material";
import { apiPost } from "../../services/models/postModel";
import { Editor } from "@tinymce/tinymce-react";

const Feed = () => {
  const userid = localStorage.getItem("SocialGramUserId");

  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState("");
  const [commentText, setCommentText] = useState("");

  const allPost = useSelector((state) => state.posts);
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

    apiPost
      .post(body, "")
      .then((res) => {
        console.log(res);
        dispatch(AddPost(body));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setPost("");
      });
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
      .then(() => {
        // console.log(res);
        getPost(dispatch, undefined);
      })
      .catch(() => toast.error('Oops! The fire couldn"t be added 🥺🥺!!'));
  };

  return (
    <React.Fragment>
      <InputForm post={post} addPost={addPost} setPost={setPost} />
      <Box
        sx={{
          flexDirection: "column",
          display: "flex",
        }}
      >
        {isLoading ? (
          <Loading />
        ) : (
          allPost?.map((post, idx) => (
            <Post
              key={idx}
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

const InputForm = ({ post, addPost, setPost }) => {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
        How about a thought ?
      </Typography>
      <Box className="input-group-lg">
        <Editor
          apiKey={import.meta.env.VITE_TINYEDITOR}
          init={{
            height: 200,
            menubar: false,
            plugins:
              "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate tableofcontents footnotes autocorrect typography inlinecss markdown",
            toolbar:
              "undo redo | blocks fontsize forecolor | bold italic underline strikethrough emoticons | link image media table | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | charmap | removeformat",
            ai_request: (request, respondWith) =>
              respondWith.string(() =>
                Promise.reject("See docs to implement AI Assistant")
              ),
            content_style:
              'html{font-family: "Poppins", sans-serif;} body { font-size:16px; color: white;}',
          }}
          initialValue="Weather was good today"
          contentCss="dark"
          value={post}
          onEditorChange={(newValue, editor) => setPost(newValue)}
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
        sx={{ marginY: 2 }}
      >
        Add Post
      </Button>
    </React.Fragment>
  );
};
