import React from "react";
import { useRef } from "react";
import { useState } from "react";
import Illustration from "../assets/iillustration.png";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = ({ setIsLogin }) => {
  const email = useRef("");
  const password = useRef("");
  const LINK = process.env.REACT_APP_HEROKU_LINK;
  const history = useHistory();

  const onSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${LINK}signin`, {
        email: email.current.value,
        password: password.current.value,
      })
      .then((res) => {
        console.log(res);
        history.push("/homepage");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      <h3>Login</h3>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          ref={email}
          className="form-control"
          placeholder="enter email"
        />
        <input
          ref={password}
          type="password"
          className="form-control"
          placeholder="enter password"
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
  );
};
const Signup = ({ setIsLogin }) => {
  const fname = useRef("");
  const lname = useRef("");
  const email = useRef("");
  const password = useRef("");
  const LINK = process.env.REACT_APP_HEROKU_LINK;

  const onSubmit = (event) => {
    event.preventDefault();

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
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <React.Fragment>
      <h3>Signup</h3>
      <form onSubmit={onSubmit}>
        <input
          ref={fname}
          type="text"
          className="form-control"
          placeholder="enter first name"
        />
        <input
          ref={lname}
          type="text"
          className="form-control"
          placeholder="enter last name"
        />
        <input
          ref={email}
          type="text"
          className="form-control"
          placeholder="enter email"
        />
        <input
          ref={password}
          type="password"
          className="form-control"
          placeholder="enter password"
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
      </form>
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
