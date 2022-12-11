import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PartLoader } from "../../components/CustomLoading";
import { apiAuth } from "../../services/models/authModel";
import toast from "react-hot-toast";
import { Box, Button, TextField, Typography } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
  const emailInput = document.getElementById("email");
  
  useEffect(() => {
    if (emailRegex.test(email)) {
      emailInput?.setCustomValidity("");
    } else {
      emailInput?.setCustomValidity("Please enter a valid email address.");
    }
  }, [email]);


  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const PREFIX = "SocialGram";

  const onSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    localStorage.setItem(`${PREFIX}Email`, email);

    const body = {
      email: email,
      password: password,
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
      .catch((err) => {
        toast.error("Incorrect Credentials");
        setIsLoading(false);
      });
  };

  return (
    <React.Fragment>
      {isLoading ? (
        <Box>
          <PartLoader className="text-center">
            <p className="text-center">Logging you in !!</p>
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
              label="Email"
              id="email"
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
                Don't have an account? then{" "}
                <em>
                  <Link to={"/signup"} className="formlink">
                    Signup
                  </Link>
                </em>
              </Typography>
            </Box>
          </form>
        </>
      )}
    </React.Fragment>
  );
};

export default Login;
