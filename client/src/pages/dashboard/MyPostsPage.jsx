import React, { useState, useEffect } from "react";
import { Box, Divider, Typography } from "@mui/material";
import Loading from "../../components/CustomLoading";
import { apiPost } from "../../services/models/postModel";
import { apiUser } from "../../services/models/userModal";
// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import Post from "./components/Post";
import ProfileDisplay from "./components/ProfileDisplay";
import { avatarGen } from "../../helpers/avatarGenerator";

const MyPosts = () => {
  const userid = localStorage.getItem("SocialGramUserId");

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [imageUrl, setImageUrl] = useState("");

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
    // const userid = localStorage.getItem("SocialGramUserId");
    apiUser.getSingle(`${userid}`, signal).then((res) => {
      // console.log(res);
      setProfile(res.message);
      setImageUrl(avatarGen(res.message?.avatar));
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
      <ProfileDisplay profile={profile} imageUrl={imageUrl} />
      <Divider sx={{ my: 3 }} />
      {posts?.length === 0 && (
        <Box className="text-center">
          <Typography variant="h5" component="p" sx={{ mb: 2 }}>
            No Post yet !!
          </Typography>
        </Box>
      )}
      <Box style={{ flexDirection: "column-reverse" }} className="d-flex">
        {posts?.map((post) => (
          <Post userId={userid} post={post} key={post.id} />
        ))}
      </Box>
    </>
  );
};

export default MyPosts;
