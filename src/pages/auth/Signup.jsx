import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import Illustration from "../../assets/Illustration.png";
import { apiPlain } from "../../services/models/plainModel";
import toast from "react-hot-toast";

const Signup = () => {
  const fname = useRef("");
  const lname = useRef("");
  const email = useRef("");
  const password = useRef("");

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
    localStorage.setItem(`${PREFIX}Email`, email.current.value);

    const body = {
      fname: fname.current.value,
      lname: lname.current.value,
      email: email.current.value,
      password: password.current.value,
    };

    apiPlain
      .post(body, "register")
      .then((res) => {
        setIsLoading(false);

        if (res.status === "400") {
          toast.error(res.message);
        } else if (res.status === "200") {
          toast.success("Account Created.You can login now!!");
          navigate("/login");
        } else if (res.status === "500") {
          toast.error("Internal server error");
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
            <h3>Signup</h3>
            <form onSubmit={onSubmit}>
              <div className="form-group mb-2">
                <input
                  ref={fname}
                  type="text"
                  className="form-control w-100"
                  placeholder="enter first name"
                  required
                />
              </div>
              <div className="form-group mb-2">
                <input
                  ref={lname}
                  type="text"
                  className="form-control w-100"
                  placeholder="enter last name"
                  required
                />
              </div>
              <div className="form-group mb-2">
                <input
                  type="text"
                  ref={email}
                  className="form-control w-100"
                  placeholder="enter email"
                  required
                />
              </div>
              <div className="form-group mb-2">
                <input
                  ref={password}
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
                  <em onClick={() => navigate("/login")}>Login</em>
                </p>
              </div>
            </form>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Signup;
