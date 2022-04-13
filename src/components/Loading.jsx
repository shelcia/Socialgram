import React from "react";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Rings } from "react-loader-spinner";

const Loading = ({ children }) => {
  return (
    <div
      className="w-100 h-100 d-flex"
      style={{ alignItems: "center", justifyContent: "center" }}
    >
      <Rings type="TailSpin" color="#007bff" height={250} width={250}>
        {children}
      </Rings>
    </div>
  );
};

export default Loading;
