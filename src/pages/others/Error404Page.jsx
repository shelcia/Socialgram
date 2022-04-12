import React from "react";
import { useHistory } from "react-router";
import Error from "../assets/undraw_page_not_found_su7k.svg";

const Error404 = () => {
  const history = useHistory();

  return (
    <div
      className="d-flex justify-content-center flex-column mx-auto aligm-items-center"
      style={{ height: "60vh" }}
    >
      <img src={Error} alt="" style={{ height: "50vh" }} />
      <h1>Oops ! Wrong Link</h1>
      <button
        onClick={() => history.push("/")}
        className="btn btn-primary mt-4"
      >
        Go home
      </button>
    </div>
  );
};

export default Error404;
