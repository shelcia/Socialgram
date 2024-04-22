import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import Error from "../../assets/error/undraw_page_not_found_su7k.svg";

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        p: 4,
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <img src={Error} alt="" style={{ height: "40vh" }} />
      <Typography component="h1" variant="h3" sx={{ mt: 3 }}>
        Oops ! Somthing went wrong
      </Typography>
      <Button onClick={() => navigate("/")} sx={{ mt: 4 }} variant="contained">
        Go home
      </Button>
    </Box>
  );
};

export default Error404;
