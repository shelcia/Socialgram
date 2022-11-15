import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import ProfileTable from "./components/ProfileTable";
import { apiUser } from "../../services/models/userModal";
import {
  Box,
  Button,
  Divider,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { avatarLabels } from "../../context/data/Labels";

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);

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

  const handleAvatarInput = (event) => {
    setProfile({
      ...profile,
      avatar: {
        ...profile.avatar,
        [event.target.name]: event.target.value,
      },
    });
  };

  const fetchProfile = (signal) => {
    const userid = localStorage.getItem("SocialGramUserId");
    apiUser.getSingle(`${userid}`, signal).then((res) => {
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

  return (
    <React.Fragment>
      <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
        Profile
      </Typography>
      <Divider sx={{ mb: 1 }} />
      {/* <hr /> */}
      <Box className="text-center">
        {!isEdit ? (
          <img
            src={`https://avatars.dicebear.com/api/avataaars/:seed.svg?${imageUrl}&r=50&size=200`}
            alt="avatar"
          />
        ) : (
          <>
            <Table aria-label="profile table">
              <TableBody>
                {avatarLabels.map((prof, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{prof.label}</TableCell>
                    <TableCell>
                      <Select
                        label={prof.label}
                        name={prof.name}
                        value={profile?.avatar?.[prof.name]}
                        onChange={(event) => handleAvatarInput(event)}
                        size="small"
                        fullWidth
                      >
                        {prof?.values?.map((val, idx) => (
                          <MenuItem value={val} key={val}>
                            {val}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </Box>

      <ProfileTable
        profile={profile}
        isEdit={isEdit}
        handleInput={handleInput}
      />
      <Box className="text-center" sx={{ mt: 3 }}>
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
