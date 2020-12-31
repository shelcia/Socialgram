import React from "react";
import { Link } from "react-router-dom";
import Illustration from "../../assets/Illustration.png";

const OpeningPage = () => {
  return (
    <React.Fragment>
      <div className="col-sm-9">
        <img src={Illustration} style={{ maxHeight: "80vh" }} alt="" />
      </div>
      <div className="col-sm-3" style={{ height: "86vh", overflowY: "auto" }}>
        <h2 className="my-4" style={{ color: "#BCC1D5" }}>Welcome!!</h2>
        <h3 className="mt-3" style={{ fontStyle: "italic", color: "#2E5090"}}>
          Social Gram provides you a social networking platform to collaborate with 
          users worldwide and share your common interests.
        </h3>
        <h3 className="mt-3" style={{ fontStyle: "italic", color: "#BCC1D5" }}>
          Comment, Post, Like and React to your favourite posts. Get the essence of 
          Facebook on a smaller scale and strengthen your bonds with your community 
          members.
        </h3>
        <h3 className="mt-3" style={{ fontStyle: "italic", color: "#2E5090"}}>
          Join Us Today !!
        </h3>
        <div className="text-center mt-4">
          <Link to="/logIn" class="btn btn-primary">Log In</Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default OpeningPage;
