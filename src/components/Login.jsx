import React from "react";
import { useRef } from "react";
import { useState } from "react";
import Illustration from "../assets/Illustration.png";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Loading from "./Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ setIsLogin }) => {
  const email = useRef("");
  const password = useRef("");
  const LINK = process.env.REACT_APP_HEROKU_LINK;
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const PREFIX = "SocialGram";

  const sucessNotify = (message) => {
    toast.success(message);
  };
  const failedNotify = (message) => {
    toast.error(message);
  };

  const onSubmit = (event) => {
    setIsLoading(true);
    localStorage.setItem(`${PREFIX}Email`, email.current.value);
    event.preventDefault();
    axios
      .post(`${LINK}signin`, {
        email: email.current.value,
        password: password.current.value,
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem(`${PREFIX}Token`, res.data.token);
        localStorage.setItem(`${PREFIX}UserId`, res.data.userId);
        setIsLoading(false);
        sucessNotify("Login succesfulll");

        history.push("/homepage/profile");
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        failedNotify("Incorrect Credentials");
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
          {" "}
          <h3>Login</h3>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              ref={email}
              className="form-control"
              placeholder="enter email"
              required
            />
            <input
              ref={password}
              type="password"
              className="form-control"
              placeholder="enter password"
              required
            />
            <div className="text-center mt-4">
              <button className="btn btn-primary" type="submit">
                Login
              </button>
            </div>
            <div className="text-center mt-4">
              <p>
                Don't have an account? then{" "}
                <em onClick={() => setIsLogin(false)}>Signup</em>
              </p>
            </div>
          </form>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
const Signup = ({ setIsLogin }) => {
  const fname = useRef("");
  const lname = useRef("");
  const email = useRef("");
  const password = useRef("");
  const LINK = process.env.REACT_APP_HEROKU_LINK;
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    const response = {
      fname: fname.current.value,
      lname: lname.current.value,
      email: email.current.value,
      password: password.current.value,
    };
    console.log(response);

    axios
      .post(`${LINK}register`, response)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };
  return (
    <React.Fragment>
      {isLoading ? (
        <Loading>
          <h1>Please wait while we create your account !!</h1>
        </Loading>
      ) : (
        <React.Fragment>
          <h3>Signup</h3>
          <form onSubmit={onSubmit}>
            <input
              ref={fname}
              type="text"
              className="form-control"
              placeholder="enter first name"
              required
            />
            <input
              ref={lname}
              type="text"
              className="form-control"
              placeholder="enter last name"
              required
            />
            <input
              ref={email}
              type="text"
              className="form-control"
              placeholder="enter email"
              required
            />
            <input
              ref={password}
              type="password"
              className="form-control"
              placeholder="enter password"
              required
            />
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

const LandingPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <React.Fragment>
      <div className="col-sm-9">
        <img src={Illustration} style={{ maxHeight: "84vh" }} alt="" />
      </div>
      <div className="col-sm-3 form">
        {isLogin ? (
          <Login setIsLogin={setIsLogin} />
        ) : (
          <Signup setIsLogin={setIsLogin} />
        )}
      </div>
    </React.Fragment>
  );
};

export default LandingPage;
