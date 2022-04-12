import React from "react";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Rings } from "react-loader-spinner";

const Loading = ({ children }) => {
  return (
    <div
      className="w-100 h-100 d-flex"
      style={{ alignItems: "center", justifyContent: "center" }}
    >
      <Rings
        type="TailSpin"
        color="#007bff"
        height={100}
        width={100}
        timeout={3000}
      >
        {children}
      </Rings>
    </div>
  );
};

export default Loading;
