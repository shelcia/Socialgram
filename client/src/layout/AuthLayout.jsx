import React from "react";
import { Box, Card, CardContent, Grid, Link, Typography } from "@mui/material";
import Img1 from "../assets/home/gradient-left-dark.svg";
import Img2 from "../assets/home/gradient-right-dark.svg";

const AuthLayout = ({ children }) => (
  <Grid container sx={{ height: "100vh" }}>
    <img src={Img1} alt="" style={{ position: "fixed", zIndex: -1 }} />
    <img src={Img2} alt="" style={{ position: "fixed", zIndex: -1 }} />
    <Grid
      item
      md={6}
      xs={12}
      sx={{
        justifyContent: "center",
        height: "100vh",
        alignItems: "left",
        display: "flex",
        flexDirection: "column",
        paddingX: { xs: 2, md: 6 },
      }}
    >
      <Typography component="h1" variant="h1">
        Socialgram
      </Typography>
      <Typography component="p" variant="subtitle1" mt={2}>
        Social Gram is a social media website that allows users to create and
        share content. Users will be able to create posts, and share them with
        others. The platform also allows for users to react and engage with
        other users content, such as by liking, commenting, or sharing.
      </Typography>
      <Box mt={2} sx={{ display: "flex", verticalAlign: "middle" }}>
        <Typography component="p" variant="subtitle1" mr={1}>
          Devloped by
        </Typography>
        <Typography
          component={Link}
          variant="subtitle1"
          href="https://shelcia-dev.me/"
          target="_blank"
          mr={1}
        >
          Shelcia
        </Typography>
        -
        <Typography component="p" variant="subtitle1" mr={1} ml={1}>
          Code on
        </Typography>
        <Typography
          component={Link}
          variant="subtitle1"
          href="https://github.com/shelcia/Socialgram"
          target="_blank"
        >
          Github
        </Typography>
      </Box>
    </Grid>
    <Grid
      item
      md={6}
      xs={12}
      sx={{
        justifyContent: "center",
        height: "100vh",
        alignItems: "center",
        display: "flex",
      }}
    >
      <Card
        sx={{
          minWidth: 275,
          background: "rgba(0, 0, 0, 0.2)",
          borderRadius: 2,
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(5px)",
          border: "1px solid rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardContent>{children}</CardContent>
      </Card>
    </Grid>
  </Grid>
);

export default AuthLayout;
