import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { apiAuth } from "../../services/models/authModel";
import toast from "react-hot-toast";
import { Box, Button, TextField, Typography } from "@mui/material";

const Signup = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const PREFIX = "SocialGram";

  const [warning, setWarning] = useState(true);

  useEffect(() => {
    if (password.length >= 6) {
      setWarning(false);
    } else {
      setWarning(true);
    }
  }, [password]);

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
            />
            <TextField
              label="Last Name"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              size="small"
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="small"
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              size="small"
              fullWidth
              sx={{ mb: 2 }}
            />
            {warning && (
              <p className="text-danger mt-4">
                *Password should have atleast 6 characters
              </p>
            )}
            <Box className="text-center mt-4">
              <Button variant="contained" type="submit" onClick={onSubmit}>
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
