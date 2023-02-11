import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { PartLoader } from "../../components/CustomLoading";
import { apiAuth } from "../../services/models/authModel";

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
      fname,
      lname,
      email,
      password,
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
      .catch(() => {
        toast.error("Incorrect Credentials");
        setIsLoading(false);
      });
  };

  return isLoading ? (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <PartLoader>
        <Typography variant="p" component="p" className="text-center">
          Please wait while we create your account !!
        </Typography>
      </PartLoader>
    </Box>
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
          onChange={(e) => setEmail(e.target.value)}
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
        {warning && (
          <p className="text-danger mt-4">
            *Password should have atleast 6 characters
          </p>
        )}
        <Box className="text-center mt-4">
          <Button variant="contained" type="submit">
            Signup
          </Button>
        </Box>
        <div className="text-center mt-4">
          <Typography variant="p" component="p">
            Already have an account? then{" "}
            <em>
              <Link to="/login" className="formlink">
                Login
              </Link>
            </em>
          </Typography>
        </div>
      </form>
    </>
  );
};

export default Signup;
