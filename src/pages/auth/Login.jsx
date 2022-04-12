import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import Illustration from "../../assets/Illustration.png";
import { apiPlain } from "../../services/models/plainModel";
import toast from "react-hot-toast";

const Login = () => {
  const email = useRef("");
  const password = useRef("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const PREFIX = "SocialGram";

  const onSubmit = (event) => {
    setIsLoading(true);
    localStorage.setItem(`${PREFIX}Email`, email.current.value);
    event.preventDefault();

    const body = {
      email: email.current.value,
      password: password.current.value,
    };

    apiPlain
      .post(body, "signin")
      .then((res) => {
        setIsLoading(false);

        if (res.status === "400") {
          toast.error(res.message);
        } else if (res.status === "500") {
          toast.error("Internal server error");
        } else if (res.status === "200") {
          localStorage.setItem(`${PREFIX}Token`, res.message.token);
          localStorage.setItem(`${PREFIX}UserId`, res.message.userId);
          navigate("/homepage");
        }
      })
      .catch((err) => toast.error("Incorrect Credentials"));

    setIsLoading(false);
  };

  return (
    <React.Fragment>
      {isLoading ? (
        <Loading>
          <h1>Please wait while we create your account !!</h1>
        </Loading>
      ) : (
        <React.Fragment>
          <div className="col-lg-8">
            <img
              src={Illustration}
              style={{ maxHeight: "84vh" }}
              className="img-fluid"
              alt=""
            />
          </div>
          <div className="col-lg-4 form d-flex align-items-center flex-column justify-content-center flex-wrap">
            <h3>Login</h3>
            <form onSubmit={onSubmit}>
              <div className="form-group mb-2">
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
                  <em onClick={() => navigate("/signup")}>Signup</em>
                </p>
              </div>
            </form>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Login;
