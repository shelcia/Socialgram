import React, { useState, useEffect } from "react";
import { Box, Divider, Typography } from "@mui/material";
import Loading from "../../components/CustomLoading";
import { apiPost } from "../../services/models/postModel";
import { apiUser } from "../../services/models/userModal";
import Post from "./components/Post";
import ProfileDisplay from "./components/ProfileDisplay";

const MyPosts = () => {
  const userId = localStorage.getItem("SocialGramUserId");

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState({
    fname: "",
    lname: "",
    email: "",
    date: "",
    pronouns: "",
    location: "",
    website: "",
    bio: "",
    followers: [],
    following: [],
    avatar: {
      avatarStyle: "",
      top: "",
      accessories: "",
      hairColor: "",
      facialHair: "",
      clothes: "",
      eyes: "",
      eyebrow: "",
      mouth: "",
      skin: "",
    },
  });

  const getMyPost = (signal) => {
    const id = localStorage.getItem("SocialGramUserId");
    apiPost.getSingle(`myposts/${id}`, signal).then((response) => {
      // console.log(response);
      setPosts(response.message);
      setLoading(false);
    });
  };

  useEffect(() => {
    const ac = new AbortController();
    getMyPost(ac.signal);
    return () => ac.abort();
  }, []);

  const fetchProfile = (signal) => {
    apiUser.getSingle(`${userId}`, signal).then((res) => {
      // console.log(res);
      setProfile(res.message);
      setLoading(false);
    });
  };

  useEffect(() => {
    const ac = new AbortController();
    fetchProfile(ac.signal);
    return () => ac.abort();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <>
      <ProfileDisplay profile={profile} />
      <Divider sx={{ my: 3 }} />
      {posts?.length === 0 && (
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h5" component="p" sx={{ mb: 2 }}>
            No Post yet !!
          </Typography>
        </Box>
      )}
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {posts?.map((post) => (
          <Post userId={userId} post={post} key={post.id} />
        ))}
      </Box>
    </>
  );
};

export default MyPosts;
