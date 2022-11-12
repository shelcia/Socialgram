import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import ProfileTable from "./components/ProfileTable";
import { apiUser } from "../../services/models/userModal";
import { Box, Button, Typography } from "@mui/material";

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);

  const [profile, setProfile] = useState({
    fname: "",
    lname: "",
    email: "",
    date: "",
  });

  const handleInput = (event) => {
    setProfile({
      ...profile,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    const ac = new AbortController();
    const userid = localStorage.getItem("SocialGramUserId");
    apiUser.getSingle(`${userid}`, ac.signal).then((res) => {
      setProfile(res.message);
    });
    return () => ac.abort();
  }, []);

  const editUser = (event) => {
    event.preventDefault();
    const userid = localStorage.getItem("SocialGramUserId");

    const response = { fname: profile.fname, lname: profile.lname };
    apiUser.put(response, `${userid}`).then((res) => {
      toast.success("Successfully Edited your profile");
    });
  };

  return (
    <React.Fragment>
      <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
        Profile
      </Typography>
      <hr />
      <ProfileTable
        profile={profile}
        isEdit={isEdit}
        handleInput={handleInput}
      />
      <Box className="text-center" sx={{ mt: 3 }}>
        {!isEdit ? (
          <Button variant="contained" onClick={() => setIsEdit(true)}>
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
              sx={{ mr: 1 }}
            >
              Confirm
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={(event) => {
                setIsEdit(false);
              }}
              sx={{ ml: 1 }}
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
