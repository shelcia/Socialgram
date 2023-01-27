import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/CustomLoading";
import { avatarGen } from "../../helpers/avatarGenerator";
import { apiUser } from "../../services/models/userModal";
import ProfileDisplay from "./components/ProfileDisplay";
import { Box, Divider, Typography } from "@mui/material";
import { apiPost } from "../../services/models/postModel";
import Post from "./components/Post";

const ProfilePage = () => {
  const { id } = useParams();

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

  const [posts, setPosts] = useState([]);

  const fetchProfile = (id, signal) => {
    // const userid = localStorage.getItem("SocialGramUserId");
    apiUser.getSingle(id, signal).then((res) => {
      console.log(res);
      if (res.status === "200") {
        setProfile(res.message);
        setImageUrl(avatarGen(res.message?.avatar));
      }

      setLoading(false);
    });
  };

  useEffect(() => {
    const ac = new AbortController();
    fetchProfile(id, ac.signal);
    return () => ac.abort();
  }, [id]);

  const getUserPost = (id, signal) => {
    apiPost.getSingle(`myposts/${id}`, signal).then((response) => {
      // console.log(response);
      setPosts(response.message);
      setLoading(false);
    });
  };

  useEffect(() => {
    const ac = new AbortController();
    getUserPost(id, ac.signal);
    return () => ac.abort();
  }, [id]);

  return loading ? (
    <Loading></Loading>
  ) : (
    <React.Fragment>
      <Box sx={{ mt: 3 }}>
        <ProfileDisplay profile={profile} imageUrl={imageUrl} />
        <Divider sx={{ my: 1 }} />

        {posts?.length === 0 ? (
          <Box className="text-center">
            <Typography variant="h5" component="p" sx={{ mb: 2 }}>
              No Post yet !!
            </Typography>
          </Box>
        ) : (
          <Box style={{ flexDirection: "column-reverse" }} className="d-flex">
            {posts?.map((post) => (
              <Post userId={id} post={post} key={post.id} />
            ))}
          </Box>
        )}
      </Box>
    </React.Fragment>
  );
};

export default ProfilePage;
