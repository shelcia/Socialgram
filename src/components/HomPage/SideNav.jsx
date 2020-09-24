import React from "react";
import Home from "../../assets/home.png";
import Profile from "../../assets/profile.png";
import MyPost from "../../assets/posts.png";
import Settings from "../../assets/settings.png";
import Logout from "../../assets/logout.png";
import { NavLink } from "react-router-dom";

const SideNav = () => {
  return (
    <React.Fragment>
      <div className="col-sm-3">
        <ul className="list-group list-group-flush">
          <li className="list-group-item list-group-item-action list-group-item-dark">
            <NavLink to="/homepage" exact activeClassName="active">
              <img className="icon" src={Home} alt="" /> Home
            </NavLink>
          </li>
          <li className="list-group-item list-group-item-action list-group-item-dark">
            <NavLink to="/homepage/profile" activeClassName="active">
              <img className="icon" src={Profile} alt="" /> Profile
            </NavLink>
          </li>
          <li className="list-group-item list-group-item-action list-group-item-dark">
            <NavLink to="/homepage/myposts" activeClassName="active">
              <img className="icon" src={MyPost} alt="" /> My Post
            </NavLink>
          </li>
          <li className="list-group-item list-group-item-action list-group-item-dark">
            <NavLink to="/homepage/settings" activeClassName="active">
              <img className="icon" src={Settings} alt="" /> Settings
            </NavLink>
          </li>
          <li className="list-group-item list-group-item-action list-group-item-dark">
            <NavLink to="/" exact activeClassName="active">
              <img className="icon" src={Logout} alt="" /> Logout
            </NavLink>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default SideNav;
