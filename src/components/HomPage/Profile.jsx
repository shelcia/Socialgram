import React from "react";
import Adds from "./Adds";
import SideNav from "./SideNav";

const MyProfile = () => {
  return (
    <React.Fragment>
      <div className="row">
        <SideNav />
        <div className="col-sm-6">
          <h1>Profile</h1>
          <hr />
          <h6>Fname</h6>
          <h6>Lname</h6>
          <h6>Email</h6>
          <h6>Password</h6>
        </div>
        <Adds />
      </div>
    </React.Fragment>
  );
};

export default MyProfile;
