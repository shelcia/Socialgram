import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Illustration from "../../assets/Illustration.png";
import Login from "./Login";
import Signup from "./Signup";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem(`SocialGramToken`);
    if (token) {
      history.push("/homepage");
    } else {
      history.push("/");
    }
  }, [history]);

  return (
    <React.Fragment>
      <div className="col-sm-9">
        <img src={Illustration} style={{ maxHeight: "84vh" }} alt="" />
      </div>
      <div className="col-sm-3 form d-flex align-items-center flex-column justify-content-center flex-wrap">
        {isLogin ? (
          <Login setIsLogin={setIsLogin} />
        ) : (
          <Signup setIsLogin={setIsLogin} />
        )}
      </div>
    </React.Fragment>
  );
};

export default AuthPage;
