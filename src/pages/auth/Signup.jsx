import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/CustomLoading";
import { apiAuth } from "../../services/models/authModel";
import toast from "react-hot-toast";
import { Box, Button, TextField, Typography } from "@mui/material";
import * as yup from "yup";

const Signup = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailValidation = yup.string().required().email();

  const handleEmail = (e) => {
    setEmail(e.target.value);
    emailValidation
      .validate(e.target.value)
      .then(() =>  
      e.target.setCustomValidity(""))
      .catch(
        (err) =>
        e.target.setCustomValidity("Please enter a valid email address.")
      )
  };

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const PREFIX = "SocialGram";

  const onSubmit = (event) => {
    event.preventDefault();

    setIsLoading(true);
    localStorage.setItem(`${PREFIX}Email`, email);

    const body = {
      fname: fname,
      lname: lname,
      email: email,
      password: password,
    };

    apiAuth
      .post(body, "register")
      .then((res) => {
        setIsLoading(false);

        if (res.status === "400") {
          toast.error(res.message);
          setIsLoading(false);
        } else if (res.status === "200") {
          toast.success("Account Created.You can login now!!");
          navigate("/login");
        } else if (res.status === "500") {
          toast.error("Internal server error");
          setIsLoading(false);
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
        <Loading>
          <Typography variant="p" component="p" className="text-center">
            Please wait while we create your account !!
          </Typography>
        </Loading>
      ) : (
        <>
          <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
            Signup
          </Typography>
          <form onSubmit={onSubmit}>
            <TextField
              label="First Name"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              size="small"
              fullWidth
              sx={{ mb: 2 }}
              InputProps={{
                inputProps: {
                  minLength: 3,
                },
              }}
              required
            />
            <TextField
              label="Last Name"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              size="small"
              fullWidth
              sx={{ mb: 2 }}
              InputProps={{
                inputProps: {
                  minLength: 3,
                },
              }}
              required
            />
            <TextField
              label="Email"
              value={email}
              onChange={handleEmail}
              size="small"
              fullWidth
              sx={{ mb: 2 }}
              required
            />
            <TextField
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              size="small"
              fullWidth
              sx={{ mb: 2 }}
              InputProps={{
                inputProps: {
                  minLength: 6,
                },
              }}
              required
            />
           
            <Box className="text-center mt-4">
              <Button variant="contained" type="submit" >
                Signup
              </Button>
            </Box>
            <div className="text-center mt-4">
              <Typography variant="p" component="p">
                Already have an account? then{" "}
                <em>
                  <Link to={"/login"} className="formlink">
                    Login
                  </Link>
                </em>
              </Typography>
            </div>
          </form>
        </>
      )}
    </React.Fragment>
  );
};

export default Signup;
