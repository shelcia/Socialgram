import React, { useRef, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Loading from "../Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ setIsLogin }) => {
  const email = useRef("");
  const password = useRef("");
  const LINK = process.env.REACT_APP_HEROKU_LINK;
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const PREFIX = "SocialGram";

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
        setIsLoading(false);
        if (res.data.status === "400") {
          failedNotify(res.data.message);
        } else if (res.data.status === "500") {
          failedNotify("Internal server error");
        } else if (res.data.status === "200") {
          localStorage.setItem(`${PREFIX}Token`, res.data.message.token);
          localStorage.setItem(`${PREFIX}UserId`, res.data.message.userId);
          history.push("/homepage");
        }
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
          <h3>Login</h3>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                ref={email}
                className="form-control w-100"
                placeholder="enter email"
                required
              />
            </div>
            <div className="form-group">
              <input
                ref={password}
                type="password"
                className="form-control w-100"
                placeholder="enter password"
                required
              />
            </div>
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

export default Login;
