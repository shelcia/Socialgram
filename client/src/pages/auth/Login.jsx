import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Box, Button, TextField, Typography } from "@mui/material";
import { PartLoader } from "../../components/CustomLoading";
import { apiAuth } from "../../services/models/authModel";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const PREFIX = "SocialGram";

  const onSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    localStorage.setItem(`${PREFIX}Email`, email);

    const body = {
      email,
      password,
    };

    apiAuth
      .post(body, "signin")
      .then((res) => {
        setIsLoading(false);
        // console.log(res);
        if (res.status === "400") {
          toast.error(res.message);
          setIsLoading(false);
        } else if (res.status === "500") {
          toast.error("Internal server error");
          setIsLoading(false);
        } else if (res.status === "200") {
          localStorage.setItem(`${PREFIX}Token`, res.message.token);
          localStorage.setItem(`${PREFIX}UserId`, res.message?.userId);
          localStorage.setItem(`${PREFIX}Fname`, res.message?.fname);
          localStorage.setItem(`${PREFIX}Lname`, res.message?.lname);
          localStorage.setItem(
            `${PREFIX}Avatar`,
            JSON.stringify(res.message?.avatar)
          );
          navigate("/homepage");
        } else {
          setIsLoading(false);
        }
      })
      .catch(() => {
        toast.error("Incorrect Credentials");
        setIsLoading(false);
      });
  };

  return isLoading ? (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <PartLoader>
        <Typography variant="p" component="p" className="text-center">
          Logging you in !!
        </Typography>
      </PartLoader>
    </Box>
  ) : (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Login
      </Typography>
      <form onSubmit={onSubmit}>
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          label="Email"
          fullWidth
          size="small"
          sx={{ mb: 2 }}
          required
        />
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          label="Password"
          fullWidth
          size="small"
          InputProps={{
            inputProps: {
              minLength: 6,
            },
          }}
          required
        />
        <Box className="text-center mt-4">
          <Button variant="contained" type="submit">
            Login
          </Button>
        </Box>
        <Box className="text-center mt-4">
          <Typography variant="p" component="p">
            {/*  eslint-disable-next-line react/no-unescaped-entities */}
            Don't have an account? then{" "}
            <em>
              <Link to="/signup" className="formlink">
                Signup
              </Link>
            </em>
          </Typography>
        </Box>
      </form>
    </>
  );
};

export default Login;
