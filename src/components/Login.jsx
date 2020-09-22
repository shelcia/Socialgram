import React from "react";

const Login = () => {
  return (
    <React.Fragment>
      <form>
        <input
          type="text"
          className="form-control"
          placeholder="enter user name"
        />
        <input
          type="passwork"
          className="form-control"
          placeholder="password"
        />
        <button></button>
      </form>
    </React.Fragment>
  );
};

export default Login;
