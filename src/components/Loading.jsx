import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const Loading = ({ children }) => {
  return (
    <div
      className="w-100 h-100 d-flex"
      style={{ alignItems: "center", justifyContent: "center" }}
    >
      <Loader
        type="TailSpin"
        color="#007bff"
        height={100}
        width={100}
        timeout={3000}
      >
        {children}
      </Loader>
    </div>
  );
};

export default Loading;
