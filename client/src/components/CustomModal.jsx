import React from "react";
// import { Box, Modal } from "@mui/material";
import { Box } from "@mui/material";
import styled from "@emotion/styled";

export const customModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  // bgcolor: "background.paper",
  // boxShadow: 24,
  backgroundColor: "rgba(10, 20, 2, 0)",
  backdropFilter: "saturate(100%) blur(10px)",
  // boxShadow: "inset 0 -1px 0 0 hsla(0,0%,100%,.1)",
  boxShadow: 24,
  py: 4,
  px: 4,
  border: "1px solid  hsla(0,0%,100%,.2)",
};

export const CustomModal = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  backgroundColor: "rgba(10, 20, 2, 0)",
  backdropFilter: "saturate(100%) blur(10px)",
  boxShadow: 24,
  padding: 32,
  border: "1px solid  hsla(0,0%,100%,.2)",
  [theme.breakpoints.down("sm")]: {
    width: "90%",
    padding: 12,
  },
}));
