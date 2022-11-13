import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
// import { FaThumbsUp, FaThumbsDown, FaHeart } from "react-icons/fa";
import Loading from "../../components/Loading";
import { apiPost } from "../../services/models/postModel";
import { Box, Typography } from "@mui/material";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ac = new AbortController();

    const getMyPost = () => {
      const id = localStorage.getItem("SocialGramUserId");
      apiPost.getSingle(`myposts/${id}`).then((response) => {
        console.log(response);
        setPosts(response.message);
        setLoading(false);
      });
    };

    getMyPost();
    return () => ac.abort();
  }, []);
  return (
    <React.Fragment>
      {loading ? (
        <Loading></Loading>
      ) : (
        <>
          <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
            My Posts
          </Typography>
          <hr />
          {posts?.length === 0 && (
            <Typography variant="p" component="p" sx={{ mb: 2 }}>
              No Post yet !!
            </Typography>
          )}
          <Box style={{ flexDirection: "column-reverse" }} className="d-flex">
            {posts?.map((post) => (
              <Post post={post} key={post.id} />
            ))}
          </Box>
        </>
      )}
    </React.Fragment>
  );
};

export default MyPosts;

const Post = ({ post }) => {
  return (
    <Box key={post.id} className="container bg-dark mt-3 mb-3 p-3 post rounded">
      <Typography variant="h5" component="p">
        {parse(post.title)}
      </Typography>
      {/* <div className="icon-container d-flex">
        <div className="icons" title="like">
          <FaThumbsUp className="pe-1" />
          <span>{post.likes}</span>
        </div>
        <div className="icons" title="dislike">
          <FaThumbsDown className="pe-1" />
          <span>{post.dislikes}</span>
        </div>
        <div className="icons hearts" title="heart">
          <FaHeart className="pe-1" />
          <span>{post.hearts}</span>
        </div>
      </div> */}

      {post.comments.map((comment) => (
        <Box
          key={comment.id}
          className="container p-3 mb-2 shadow-lg rounded-lg"
        >
          {parse(comment.comments)}
        </Box>
      ))}
    </Box>
  );
};
