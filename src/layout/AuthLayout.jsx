import React from "react";
import { Card, CardContent, Container } from "@mui/material";

const AuthLayout = ({ children }) => {
  return (
    <React.Fragment>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Card sx={{ minWidth: 275 }}>
          <CardContent>{children}</CardContent>
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default AuthLayout;
