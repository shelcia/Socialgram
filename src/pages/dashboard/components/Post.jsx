import React, { useEffect, useState } from "react";
import { convertDateObj, convertSimpleDate } from "../../../helpers/convert";
import parse from "html-react-parser";
import {
  Box,
  Button,
  Divider,
  Modal,
  // IconButton,
  Stack,
  TextField,
  // TextField,
  Typography,
} from "@mui/material";
import { BiComment } from "react-icons/bi";
import {
  AiOutlineFire,
  AiOutlineRetweet,
  AiOutlineShareAlt,
} from "react-icons/ai";
import {
  BlueButton,
  GreenButton,
  OrangeButton,
  PurpleButton,
} from "../../../components/CustomButtons";
import { apiPost } from "../../../services/models/postModel";
import { customModalStyle } from "../../../components/CustomModal";

const Post = ({
  userid,
  post,
  addFires,
  addComment,
  commentText,
  setCommentText,
}) => {
  const [showComment, setShowComment] = useState(false);
  const [open, setOpen] = useState(false);

  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (post?.owner?.avatar?.facialHair) {
      setImageUrl(
        `style=${post?.owner?.avatar?.avatarStyle}&top=${post?.owner?.avatar?.top}&accessories=${post?.owner?.avatar?.accessories}&hairColor=${post?.owner?.avatar?.hairColor}&facialHair=${post?.owner?.avatar?.facialHair}&clothes=${post?.owner?.avatar?.clothes}&eyes=${post?.owner?.avatar?.eyes}&eyebrow=${post?.owner?.avatar?.eyebrow}&mouth=${post?.owner?.avatar?.mouth}&skin=${post?.owner?.avatar?.skin}`
      );
    } else {
      setImageUrl(
        `style=${post?.owner?.avatar?.avatarStyle}&top=${post?.owner?.avatar?.top}&accessories=${post?.owner?.avatar?.accessories}&hairColor=${post?.owner?.avatar?.hairColor}&clothes=${post?.owner?.avatar?.clothes}&eyes=${post?.owner?.avatar?.eyes}&eyebrow=${post?.owner?.avatar?.eyebrow}&mouth=${post?.owner?.avatar?.mouth}&skin=${post?.owner?.avatar?.skin}`
      );
    }
  }, [post]);

  return (
    <React.Fragment>
      <Box key={post.id} className="container mt-3 mb-3 p-3 post rounded w-100">
        <Stack spacing={2} direction="row">
          <img
            src={`https://avatars.dicebear.com/api/avataaars/:seed.svg?${imageUrl}&r=10&size=50`}
            alt="avatar"
            height={40}
            width={40}
          />
          <Stack spacing={0}>
            <Typography variant="h6" component="h2">
              {post?.owner?.fname} {post?.owner?.lname}
            </Typography>
            <Typography
              variant="overline"
              component="p"
              className="text-muted small"
              sx={{ lineHeight: 1.5 }}
            >
              {post.date ? convertSimpleDate(post.date) : "Just now"}
            </Typography>
          </Stack>
        </Stack>

        {/* <Typography variant="h5" component="p"> */}
        {parse(post.title)}
        {/* </Typography> */}

        <Divider />
        <IconButtons
          userid={userid}
          post={post}
          showComment={showComment}
          setShowComment={setShowComment}
          addFires={addFires}
        />

        {showComment && (
          <Stack direction="row" sx={{ my: 2 }}>
            <TextField
              label="Comment"
              size="small"
              value={commentText}
              onChange={(event) => setCommentText(event.target.value)}
              className="w-75"
            />
            <Button
              variant="contained"
              onClick={(event) => {
                event.preventDefault();
                addComment(post._id);
              }}
              size="small"
              color="info"
              className="w-25"
            >
              Add Comment
            </Button>
          </Stack>
        )}
        {post.comments.length !== 0 && (
          <Button color="info" onClick={() => setOpen(true)} size="small">
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
            {/* <Chip
              // label={post.comments.length}
              color="primary"
              size="small"
              variant="contained"
              sx={{ p: 0.3, height: "none", ml: 2 }}
            >
              {post.comments.length}
            </Chip> */}
          </Button>
        )}

        <PostModal
          open={open}
          setOpen={setOpen}
          userid={userid}
          post={post}
          imageUrl={imageUrl}
          // showComment={showComment}
          // setShowComment={setShowComment}
          addFires={addFires}
        />
        {/* <Box
          style={{ maxHeight: "20vh", overflowY: "auto" }}
          className="d-flex flex-column-reverse"
        >
          {post.comments.map((comment) => (
            <Box
              key={comment.commentId}
              className="p-3 mb-2 shadow-lg rounded-lg w-100"
            >
              {parse(comment.comments)}
            </Box>
          ))}
        </Box> */}
      </Box>
    </React.Fragment>
  );
};

export default Post;

const IconButtons = ({
  userid,
  post,
  showComment,
  setShowComment = () => {},
  addFires = () => {},
}) => {
  const iconSize = "1.1rem";
  const iconBoxClass =
    "w-25 text-center d-flex justify-content-center align-items-center";

  return (
    <Stack direction="row" sx={{ mt: 1 }}>
      <Box className={iconBoxClass}>
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
      <Box className={iconBoxClass}>
        <OrangeButton
          sx={{ borderRadius: "50ex" }}
          disabled={post.fired.includes(userid)}
        >
          <AiOutlineFire size={iconSize} onClick={() => addFires(post._id)} />
          <Typography
            variant="overline"
            component="p"
            sx={{ display: "inline", ml: 1.5, mt: 0.2 }}
          >
            {post.fires}
          </Typography>
        </OrangeButton>
      </Box>
      <Box className={iconBoxClass}>
        <GreenButton>
          <AiOutlineRetweet size={iconSize} />
        </GreenButton>
      </Box>
      <Box className={iconBoxClass}>
        <BlueButton>
          <AiOutlineShareAlt size={iconSize} />
        </BlueButton>
      </Box>
    </Stack>
  );
};

const PostModal = ({
  open,
  setOpen,
  userid,
  post,
  imageUrl,
  addFires = () => {},
}) => {
  const [comments, setComments] = useState([]);

  const getComments = async (id, signal) => {
    try {
      apiPost.getSingle(`comments/${id}`, signal, "").then((res) => {
        console.log(res);
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
    <React.Fragment>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="post-modal"
        aria-describedby="use-this-to-post"
      >
        <Box sx={{ ...customModalStyle }}>
          <Stack spacing={2} direction="row">
            <img
              src={`https://avatars.dicebear.com/api/avataaars/:seed.svg?${imageUrl}&r=10&size=50`}
              alt="avatar"
              height={40}
              width={40}
            />
            <Stack spacing={0}>
              <Typography variant="h6" component="h2">
                {post?.owner?.fname} {post?.owner?.lname}
              </Typography>
              <Typography
                variant="overline"
                component="p"
                className="text-muted small"
                sx={{ lineHeight: 1.5 }}
              >
                {post.date ? convertSimpleDate(post.date) : "Just now"}
              </Typography>
            </Stack>
          </Stack>

          {parse(post.title)}

          <Divider />
          {/* <IconButtons userid={userid} post={post} addFires={addFires} /> */}
          <Divider />

          <Box
            style={{ maxHeight: "20vh", overflowY: "auto" }}
            className="d-flex flex-column-reverse"
          >
            {comments.map((comment) => (
              <CommentBox comment={comment} key={comment.commentId} />
            ))}
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

const CommentBox = ({ comment }) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (comment?.avatar?.facialHair) {
      setImageUrl(
        `style=${comment?.avatar?.avatarStyle}&top=${comment?.avatar?.top}&accessories=${comment?.avatar?.accessories}&hairColor=${comment?.avatar?.hairColor}&facialHair=${comment?.avatar?.facialHair}&clothes=${comment?.avatar?.clothes}&eyes=${comment?.avatar?.eyes}&eyebrow=${comment?.avatar?.eyebrow}&mouth=${comment?.avatar?.mouth}&skin=${comment?.avatar?.skin}`
      );
    } else {
      setImageUrl(
        `style=${comment.avatar?.avatarStyle}&top=${comment?.avatar?.top}&accessories=${comment.avatar?.accessories}&hairColor=${comment?.avatar?.hairColor}&clothes=${comment?.avatar?.clothes}&eyes=${comment?.avatar?.eyes}&eyebrow=${comment?.avatar?.eyebrow}&mouth=${comment?.avatar?.mouth}&skin=${comment?.avatar?.skin}`
      );
    }
  }, [comment]);

  return (
    <Box
      key={comment.commentId}
      className="p-3 mb-2 shadow-lg rounded-lg w-100"
    >
      {/* {parse(comment.comments)} */}
      <Stack spacing={0}>
        <Stack spacing={1} direction="row">
          <img
            src={`https://avatars.dicebear.com/api/avataaars/:seed.svg?${imageUrl}&r=15&size=30`}
            alt="avatar"
            height={25}
            width={25}
          />
          <Typography variant="h6" component="h2">
            {comment?.fname} {comment.lname}
          </Typography>
          <Typography
            variant="overline"
            component="p"
            className="text-muted small"
            sx={{ lineHeight: 2 }}
          >
            {comment.commentId ? convertDateObj(comment.commentId) : "Just now"}
          </Typography>
        </Stack>
        <Box sx={{ pl: 4 }}>{comment?.comments}</Box>
      </Stack>
    </Box>
  );
};
