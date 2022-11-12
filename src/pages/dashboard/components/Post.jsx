import React, { useEffect, useState } from "react";
import { convertDate } from "../../../helpers/convert";
import { apiPlain } from "../../../services/models/plainModel";
import parse from "html-react-parser";
import { FaThumbsUp, FaThumbsDown, FaHeart } from "react-icons/fa";
import { apiUser } from "../../../services/models/userModal";
import { Box, Button, TextField, Typography } from "@mui/material";

const Post = ({
  post,
  addLikes,
  addComment,
  disLikes,
  hearts,
  commentText,
  setCommentText,
}) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const ac = new AbortController();
    const fetchIds = async () => {
      try {
        apiUser.getSingle(`username/${post.userId}`, ac.signal).then((res) => {
          if (res) {
            // console.log(res);
            setUser(res?.message?.fname);
          } else {
            setUser("Deleted User");
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchIds();
    return () => ac.abort();
  }, [post._id, post.userId, post]);

  return (
    <React.Fragment>
      <Box
        key={post.id}
        className="container bg-dark mt-3 mb-3 p-3 post rounded w-100"
      >
        <Typography variant="h5" component="p">
          {parse(post.title)}
        </Typography>
        <Box className="my-4 d-flex justify-content-between">
          <Typography variant="p" component="p" className="text-muted">
            Posted By: {user}
          </Typography>
          <Typography variant="p" component="p" className="text-muted">
            {post.date ? convertDate(post.date) : "Just now"}
          </Typography>
        </Box>
        {/* <div className="icon-container d-flex">
          <div
            className="icons"
            title="like"
            onClick={() => addLikes(post.id, post.likes)}
          >
            <FaThumbsUp className="pe-1" />
            <span>{post.likes}</span>
          </div>
          <div
            className="icons"
            title="dislike"
            onClick={() => disLikes(post.id, post.dislikes)}
          >
            <FaThumbsDown className="pe-1" />
            <span>{post.dislikes}</span>
          </div>
          <div
            className="icons hearts"
            title="heart"
            onClick={() => hearts(post.id, post.hearts)}
          >
            <FaHeart className="pe-1" />
            <span>{post.hearts}</span>
          </div>
        </div> */}
        <div className="input-group mb-3 mt-3">
          <form className="w-100">
            <div className="form-group w-100">
              <TextField
                label="Comment"
                size="small"
                // placeholder="comment"
                value={commentText}
                onChange={(event) => setCommentText(event.target.value)}
                fullWidth
              />
            </div>
            <Button
              variant="contained"
              onClick={(event) => {
                event.preventDefault();
                addComment(post.id, post.comments);
              }}
              fullWidth
              sx={{ mt: 2, mb: 3 }}
              size="small"
            >
              Add Comment
            </Button>
          </form>
        </div>
        <Box
          style={{ maxHeight: "20vh", overflowY: "auto" }}
          className="d-flex flex-column-reverse"
        >
          {post.comments.map((comment) => (
            <Box
              key={comment.id}
              className="p-3 mb-2 shadow-lg rounded-lg w-100"
            >
              {parse(comment.comments)}
            </Box>
          ))}
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Post;
