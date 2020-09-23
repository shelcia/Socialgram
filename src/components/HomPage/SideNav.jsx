import React from "react";
import Home from "../../assets/home.png";
import Profile from "../../assets/profile.png";
import MyPost from "../../assets/posts.png";
import Settings from "../../assets/settings.png";

const SideNav = () => {
  return (
    <React.Fragment>
      <div className="col-sm-3">
        <ul className="list-group list-group-flush">
          <li className="list-group-item list-group-item-action list-group-item-dark">
            <img className="icon" src={Home} alt="" /> Home
          </li>
          <li className="list-group-item list-group-item-action list-group-item-dark">
            <img className="icon" src={Profile} alt="" /> Profile
          </li>
          <li className="list-group-item list-group-item-action list-group-item-dark">
            <img className="icon" src={MyPost} alt="" /> My Post
          </li>
          <li className="list-group-item list-group-item-action list-group-item-dark">
            <img className="icon" src={Settings} alt="" /> Settings
          </li>
          {/* <li className="list-group-item list-group-item-action list-group-item-dark">
            Copyrights 2020
          </li> */}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default SideNav;
