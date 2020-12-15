import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import axios from "axios";
// import { useHistory } from "react-router-dom";
import Loading from "../Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = ({ setIsLogin }) => {
  const fname = useRef("");
  const lname = useRef("");
  const email = useRef("");
  const [password, setPassword] = useState("");
  const LINK = process.env.REACT_APP_HEROKU_LINK;
  const [isLoading, setIsLoading] = useState(false);
  const [warning, setWarning] = useState(true);

  useEffect(() => {
    if (password.length >= 6) {
      setWarning(false);
    } else {
      setWarning(true);
    }
  }, [password]);

  const sucessNotify = (message) => {
    toast.success(message);
  };
  const failedNotify = (message) => {
    toast.error(message);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    const response = {
      fname: fname.current.value,
      lname: lname.current.value,
      email: email.current.value,
      password: password,
    };

    axios
      .post(`${LINK}register`, response)
      .then((res) => {
        setIsLoading(false);
        if (res.data.status === "400") {
          failedNotify(res.data.message);
        } else if (res.data.status === "200") {
          sucessNotify("Account Created.You can login now!!");
        } else if (res.data.status === "500") {
          failedNotify("Internal server error");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        failedNotify("Account Creation Failed!");
        console.log(error);
      });
  };
  return (
    <React.Fragment>
      <ToastContainer />
      {isLoading ? (
        <Loading>
          <h1>Please wait while we create your account !!</h1>
        </Loading>
      ) : (
        <React.Fragment>
          <h3>Signup</h3>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                ref={fname}
                type="text"
                className="form-control w-100"
                placeholder="enter first name"
                required
              />
            </div>
            <div className="form-group">
              <input
                ref={lname}
                type="text"
                className="form-control w-100"
                placeholder="enter last name"
                required
              />
            </div>
            <div className="form-group">
              <input
                ref={email}
                type="text"
                className="form-control w-100"
                placeholder="enter email"
                required
              />
            </div>
            <div className="form-group">
              <input
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                className="form-control w-100"
                placeholder="enter password"
                required
              />
            </div>
            {warning && (
              <p className="text-danger mt-4">
                *Password should have atleast 6 characters
              </p>
            )}
            <div className="text-center mt-4">
              <button className="btn btn-primary" type="submit">
                Signup
              </button>
            </div>
            <div className="text-center mt-4">
              <p>
                Already have an account? then{" "}
                <em onClick={() => setIsLogin(true)}>Login</em>
              </p>
            </div>
          </form>{" "}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
export default Signup;
