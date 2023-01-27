import {
  Box,
  Button,
  IconButton,
  Link,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { FiGlobe, FiNavigation } from "react-icons/fi";

const ProfileDisplay = ({ profile, imageUrl }) => {
  return (
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
            <Tooltip title="Not Implemented yet !">
              <Button variant="contained" color="info">
                {profile.followers.length} followers
              </Button>
            </Tooltip>
          </Stack>
          <Stack direction="row" spacing={0}>
            <Tooltip title="Not Implemented yet !">
              <Button variant="outlined" color="info">
                {profile.following.length} following
              </Button>
            </Tooltip>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default ProfileDisplay;
