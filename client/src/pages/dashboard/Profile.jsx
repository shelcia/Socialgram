import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import ProfileTable from "./components/ProfileTable";
import { apiUser } from "../../services/models/userModal";
import { Box, Button, Divider, Typography } from "@mui/material";
import Loading from "../../components/CustomLoading";

const MyProfile = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [isEdit, setIsEdit] = useState(false);

  const [profile, setProfile] = useState({
    fname: "",
    lname: "",
    email: "",
    date: "",
    pronouns: "",
    location: "",
    website: "",
    bio: "",
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

  const handleInput = (event) => {
    setProfile({
      ...profile,
      [event.target.name]: event.target.value,
    });
  };

  const fetchProfile = (signal) => {
    const userid = localStorage.getItem("SocialGramUserId");
    apiUser.getSingle(`${userid}`, signal).then((res) => {
      if (res.status === "200") {
        setProfile(res.message);
        setIsLoading(false);
      } else {
        toast.error("Error");
        setIsLoading(false);
      }
    });
  };

  useEffect(() => {
    const ac = new AbortController();
    fetchProfile(ac.signal);
    return () => ac.abort();
  }, []);

  const editUser = (event) => {
    event.preventDefault();
    const userid = localStorage.getItem("SocialGramUserId");

    const response = {
      fname: profile.fname,
      lname: profile.lname,
      pronouns: profile.pronouns,
      location: profile.location,
      website: profile.website,
      avatar: profile.avatar,
      bio: profile.bio,
    };
    apiUser.put(response, `${userid}`).then((res) => {
      toast.success("Successfully Edited your profile");
      fetchProfile();
    });
  };

  return isLoading ? (
    <Loading />
  ) : (
    <React.Fragment>
      <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
        Profile
      </Typography>
      <Divider sx={{ mb: 1 }} />
      <ProfileTable
        profile={profile}
        isEdit={isEdit}
        handleInput={handleInput}
      />
      <Box sx={{ mt: 3, textAlign: "center" }}>
        {!isEdit ? (
          <Button
            variant="contained"
            onClick={() => setIsEdit(true)}
            sx={{ mb: 4 }}
            color="info"
          >
            Edit Profile Details
          </Button>
        ) : (
          <React.Fragment>
            <Button
              variant="contained"
              onClick={(event) => {
                editUser(event);
                setIsEdit(false);
              }}
              sx={{ mr: 1, mb: 4 }}
              color="info"
            >
              Confirm
            </Button>
            <Button
              variant="outlined"
              color="info"
              onClick={(event) => {
                setIsEdit(false);
              }}
              sx={{ ml: 1, mb: 4 }}
            >
              Cancel
            </Button>
          </React.Fragment>
        )}
      </Box>
    </React.Fragment>
  );
};

export default MyProfile;
