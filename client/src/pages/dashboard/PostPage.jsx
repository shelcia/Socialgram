import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import Loading from "../../components/CustomLoading";
import { apiPost } from "../../services/models/postModel";
import Post from "./components/Post";

const PostPage = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  const userid = localStorage.getItem("SocialGramUserId");

  const [post, setPost] = useState({
    fired: [],
    comments: [],
    reshare: false,
    date: "",
    _id: "",
    id: "",
    userId: "",
    ownerId: "",
    title: "",
    fires: 0,
    user: {
      fname: "",
      lname: "",
      avatar: "",
    },
    owner: {
      fname: "",
      lname: "",
      avatar: "",
    },
  });

  const fetchPost = (id, signal) => {
    apiPost.getSingle(id, signal).then((res) => {
      // console.log(res);
      if (res.status === "200") {
        setPost(res.message);
        setIsLoading(false);
      } else {
        toast.error("Error !");
      }
    });
  };

  useEffect(() => {
    const ac = new AbortController();
    fetchPost(id, ac.signal);
    return () => ac.abort();
  }, [id]);

  return (
    <React.Fragment>
      <Box style={{ flexDirection: "column-reverse" }} className="d-flex">
        {isLoading ? (
          <Loading />
        ) : (
          <Post userId={userid} post={post} key={post.id} />
        )}
      </Box>
    </React.Fragment>
  );
};

export default PostPage;
