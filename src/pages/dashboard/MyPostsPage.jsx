import React, { useState, useEffect } from "react";
// import parse from "html-react-parser";
import Loading from "../../components/CustomLoading";
import { apiPost } from "../../services/models/postModel";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { apiUser } from "../../services/models/userModal";
import { FiNavigation, FiGlobe } from "react-icons/fi";
import Post from "./components/Post";

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
    // console.log("jfkjfk");
    apiPost.getSingle(`myposts/${id}`, signal).then((response) => {
      console.log(response);
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
    const userid = localStorage.getItem("SocialGramUserId");
    apiUser.getSingle(`${userid}`, signal).then((res) => {
      // console.log(res);
      setProfile(res.message);
      if (res.message?.avatar?.facialHair) {
        setImageUrl(
          `style=${res.message?.avatar?.avatarStyle}&top=${res.message?.avatar?.top}&accessories=${res.message?.avatar?.accessories}&hairColor=${res.message?.avatar?.hairColor}&facialHair=${res.message?.avatar?.facialHair}&clothes=${res.message?.avatar?.clothes}&eyes=${res.message?.avatar?.eyes}&eyebrow=${res.message?.avatar?.eyebrow}&mouth=${res.message?.avatar?.mouth}&skin=${res.message?.avatar?.skin}`
        );
      } else {
        setImageUrl(
          `style=${res.message?.avatar?.avatarStyle}&top=${res.message?.avatar?.top}&accessories=${res.message?.avatar?.accessories}&hairColor=${res.message?.avatar?.hairColor}&clothes=${res.message?.avatar?.clothes}&eyes=${res.message?.avatar?.eyes}&eyebrow=${res.message?.avatar?.eyebrow}&mouth=${res.message?.avatar?.mouth}&skin=${res.message?.avatar?.skin}`
        );
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    const ac = new AbortController();
    fetchProfile(ac.signal);
    return () => ac.abort();
  }, []);

  return (
    <React.Fragment>
      {loading ? (
        <Loading></Loading>
      ) : (
        <>
          <Box className="row">
            <Box className="col-md-4">
              <img
                src={`https://avatars.dicebear.com/api/avataaars/:seed.svg?${imageUrl}&r=50&size=200`}
                alt="avatar"
              />
            </Box>
            <Box className="col-md-8">
              <Typography variant="h4" component="h1" sx={{ mb: 1 }}>
                {profile?.fname} {profile?.lname}
              </Typography>
              <Typography variant="body2" component="p" sx={{ mb: 2 }}>
                {profile?.pronouns}
              </Typography>

              <Typography variant="p" component="p" sx={{ mb: 2 }}>
                {profile?.bio}
              </Typography>

              <Stack direction="row" spacing={2}>
                {profile?.location && profile?.location !== "" && (
                  <Typography variant="p" component="p" sx={{ mb: 2 }}>
                    <IconButton aria-label="location" size="small" color="info">
                      <FiNavigation size={"0.8rem"} />
                    </IconButton>
                    {profile?.location}
                  </Typography>
                )}

                {profile?.website && profile?.website !== "" && (
                  <Typography variant="p" component="p" sx={{ mb: 2 }}>
                    <IconButton aria-label="website" size="small" color="info">
                      <FiGlobe size={"0.8rem"} />
                    </IconButton>
                    <Link target="_blank">{profile?.website}</Link>
                  </Typography>
                )}
              </Stack>

              <Stack direction="row" spacing={3}>
                <Stack direction="row" spacing={0}>
                  <Button variant="contained" color="info">
                    {profile.followers.length} followers
                  </Button>
                </Stack>
                <Stack direction="row" spacing={0}>
                  <Button variant="outlined" color="info">
                    {profile.following.length} following
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Box>
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
      )}
    </React.Fragment>
  );
};

export default MyPosts;

// const Post = ({ post }) => {
//   return (
//     <Box key={post.id} className="container bg-dark mt-3 mb-3 p-3 post rounded">
//       <Typography variant="h5" component="p">
//         {parse(post.title)}
//       </Typography>
//       {/* <div className="icon-container d-flex">
//         <div className="icons" title="like">
//           <FaThumbsUp className="pe-1" />
//           <span>{post.likes}</span>
//         </div>
//         <div className="icons" title="dislike">
//           <FaThumbsDown className="pe-1" />
//           <span>{post.dislikes}</span>
//         </div>
//         <div className="icons hearts" title="heart">
//           <FaHeart className="pe-1" />
//           <span>{post.hearts}</span>
//         </div>
//       </div> */}

//       {post.comments.map((comment) => (
//         <Box
//           key={comment.id}
//           className="container p-3 mb-2 shadow-lg rounded-lg"
//         >
//           {parse(comment.comments)}
//         </Box>
//       ))}
//     </Box>
//   );
// };
