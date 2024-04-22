import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Modal,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { BiComment } from "react-icons/bi";
import {
  AiOutlineFire,
  AiOutlineRetweet,
  AiOutlineShareAlt,
  AiOutlineClose,
} from "react-icons/ai";
import { grey, orange } from "@mui/material/colors";
import { RWebShare } from "react-web-share";
import { toast } from "react-hot-toast";
import {
  BlueButton,
  GreenButton,
  OrangeButton,
  PurpleButton,
} from "../../../components/CustomButtons";
import { apiPost } from "../../../services/models/postModel";
import { CustomModal } from "../../../components/CustomModal";
import { CommentTextField } from "../../../components/CustomTextField";
import { avatarGen } from "../../../helpers/avatarGenerator";
import { convertDateObj, convertSimpleDate } from "../../../helpers/convert";

const Post = ({
  userid,
  post,
  handleFires,
  addComment,
  commentText,
  setCommentText,
}) => {
  const [showComment, setShowComment] = useState(false);
  const [open, setOpen] = useState(false);

  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    setImageUrl(avatarGen(post?.owner?.avatar));
  }, [post]);

  const navigate = useNavigate();

  // console.log(post);

  return (
    <Box
      // className="container mt-3 mb-3 p-3 post rounded w-100"
      className="post"
      sx={{
        marginY: 2,
        padding: 2,
        borderRadius: 1,
        width: "100%",
      }}
      name="post"
      onClick={(e) => {
        if (e.target.name === "post") {
          navigate(`/homepage/post/${post._id}`);
        }
      }}
    >
      <Stack
        spacing={2}
        direction="row"
        component={Link}
        to={`/homepage/user/${post.ownerId}`}
      >
        <Stack spacing={0}>
          <Typography variant="h6" component="h2">
            {post?.owner?.fname} {post?.owner?.lname}
          </Typography>
          <Typography
            variant="overline"
            component="p"
            // className="text-muted small"
            sx={{ lineHeight: 1.5, color: grey[300] }}
          >
            {post.date ? convertSimpleDate(post.date) : "Just now"}
          </Typography>
        </Stack>
      </Stack>

      {parse(post.title)}

      <Divider />
      <IconButtons
        userid={userid}
        post={post}
        showComment={showComment}
        setShowComment={setShowComment}
        handleFires={handleFires}
      />

      {showComment && (
        <Stack direction="row" sx={{ my: 2 }}>
          <CommentTextField
            label="Comment"
            size="small"
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
            sx={{ width: "75%" }}
          />
          <Button
            variant="contained"
            onClick={(event) => {
              event.preventDefault();
              addComment(post._id);
            }}
            size="small"
            color="info"
            sx={{ width: "25%" }}
          >
            Add Comment
          </Button>
        </Stack>
      )}
      <Stack direction="row" sx={{ mt: 2, justifyContent: "space-between" }}>
        {post.comments.length !== 0 && (
          <Button
            color="info"
            onClick={() => setOpen(true)}
            size="small"
            sx={{ zIndex: 3 }}
          >
            Show Comments
            <Box
              sx={{
                py: 0.1,
                px: 1.2,
                height: "none",
                ml: 2,
                background:
                  "linear-gradient(to right,#7f00ff,#bf00ff,#d900ff,#e100ff)",
                borderRadius: "50ex",
              }}
            >
              {post.comments.length}
            </Box>
          </Button>
        )}

        <Link to={`/post/${post._id}`}>
          <Button>View Post</Button>
        </Link>
      </Stack>

      <PostModal
        open={open}
        setOpen={setOpen}
        userid={userid}
        post={post}
        imageUrl={imageUrl}
        // showComment={showComment}
        // setShowComment={setShowComment}
        handleFires={handleFires}
      />
    </Box>
  );
};

export default Post;

const IconButtons = ({
  userid,
  post,
  showComment,
  setShowComment = () => {},
  handleFires = () => {},
}) => {
  const iconSize = "1.1rem";

  const iconStyle = {
    width: "25%",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <Stack direction="row" sx={{ mt: 1 }}>
      <Box sx={iconStyle}>
        <PurpleButton onClick={() => setShowComment(!showComment)}>
          <BiComment size={iconSize} />
          <Typography
            variant="overline"
            component="p"
            sx={{ display: "inline", ml: 1.5, mt: 0 }}
          >
            {post.comments.length}
          </Typography>
        </PurpleButton>
      </Box>
      <Box sx={iconStyle}>
        <OrangeButton sx={{ borderRadius: "50ex" }}>
          <AiOutlineFire
            size={iconSize}
            onClick={() => handleFires(post._id)}
            style={post.fired.includes(userid) ? { color: orange[800] } : {}}
          />
          <Typography
            variant="overline"
            component="p"
            sx={{ display: "inline", ml: 1.5, mt: 0.2 }}
            style={post.fired.includes(userid) ? { color: orange[800] } : {}}
          >
            {post.fires}
          </Typography>
        </OrangeButton>
      </Box>
      <Box sx={iconStyle}>
        <Tooltip title="Not Implemented yet !">
          <GreenButton>
            <AiOutlineRetweet size={iconSize} />
          </GreenButton>
        </Tooltip>
      </Box>

      <Box sx={iconStyle}>
        <RWebShare
          data={{
            text: "Check out my post on socialgram !",
            // eslint-disable-next-line no-underscore-dangle
            url: `https://social--gram.vercel.app/post/${post._id}`,
            title: "Share",
          }}
          onClick={() => {
            console.log("shared successfully!");
            toast.success("Shared Succesfully");
          }}
        >
          <BlueButton>
            <AiOutlineShareAlt size={iconSize} />
          </BlueButton>
        </RWebShare>
        {/* <Tooltip title="Not Implemented yet !">
          <BlueButton>
            <AiOutlineShareAlt size={iconSize} />
          </BlueButton>
        </Tooltip> */}
      </Box>
    </Stack>
  );
};

const PostModal = ({
  open,
  setOpen,
  // userid,
  post,
  imageUrl,
  // handleFires = () => {},
}) => {
  const [comments, setComments] = useState([]);

  const getComments = async (id, signal) => {
    try {
      apiPost.getSingle(`comments/${id}`, signal, "").then((res) => {
        // console.log(res);
        if (res.status === "200") {
          setComments(res.message);
        }
      });
    } catch (error) {
      console.log(error);
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    const ac = new AbortController();
    getComments(post._id, ac.signal);
    return () => ac.abort();
  }, [post._id]);

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="post-modal"
      aria-describedby="use-this-to-post"
    >
      {/* <Box sx={{ ...modalStyles }}> */}
      <CustomModal>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <IconButton size="small" onClick={() => setOpen(false)}>
            <AiOutlineClose />
          </IconButton>
        </Box>

        <Stack spacing={2} direction="row">
          <Stack spacing={0}>
            <Typography variant="h6" component="h2">
              {post?.owner?.fname} {post?.owner?.lname}
            </Typography>
            <Typography
              variant="overline"
              component="p"
              sx={{ lineHeight: 1.5, color: grey[300] }}
            >
              {post.date ? convertSimpleDate(post.date) : "Just now"}
            </Typography>
          </Stack>
        </Stack>

        {parse(post.title)}

        <Divider />

        <Box
          sx={{
            maxHeight: "30vh",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column-reverse",
          }}
        >
          {comments.map((comment) => (
            <CommentBox comment={comment} key={comment.commentId} />
          ))}
        </Box>
      </CustomModal>
    </Modal>
  );
};

const CommentBox = ({ comment }) => {
  return (
    <Box
      // className="p-3 mb-2 shadow-lg rounded-lg w-100"
      sx={{ padding: 1, marginBotton: 2, width: "100%" }}
    >
      <Stack spacing={0}>
        <Stack spacing={1} direction="row">
          <Typography variant="h6" component="h2">
            {comment?.fname} {comment.lname}
          </Typography>
          <Typography
            variant="overline"
            component="p"
            sx={{ lineHeight: 2, color: grey[300] }}
          >
            {comment.commentId ? convertDateObj(comment.commentId) : "Just now"}
          </Typography>
        </Stack>
        <Box sx={{ pl: 4 }}>{comment?.comments}</Box>
      </Stack>
    </Box>
  );
};
