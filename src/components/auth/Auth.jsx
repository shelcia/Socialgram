import React, { useState } from "react";
import Illustration from "../../assets/Illustration.png";
import Login from "./Login";
import Signup from "./Signup";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
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
