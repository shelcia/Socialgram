import React from "react";
import { Rings } from "react-loader-spinner";

const Loading = ({ children }) => {
  return (
    <div
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        display: "flex",
      }}
    >
      <Rings type="TailSpin" color="#7F00FF" height={150} width={150} />
      {children}
    </div>
  );
};

export default Loading;

export const PartLoader = ({ children }) => (
  <div
    style={{
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Rings
      type="TailSpin"
      color="#7F00FF"
      height={150}
      width={150}
      style={{
        justifyContent: "center",
      }}
    />
    {children}
  </div>
);
