import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUserAlt,
  FaStickyNote,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const SideNav = () => {
  const links = [
    {
      name: "Home",
      icon: <FaHome />,
      link: "/homepage",
    },
    {
      name: "Profile",
      icon: <FaUserAlt />,
      link: "/homepage/profile",
    },
    {
      name: "My Post",
      icon: <FaStickyNote />,
      link: "/homepage/myposts",
    },
    {
      name: "Settings",
      icon: <FaCog />,
      link: "/homepage/settings",
    },
  ];

  return (
    <React.Fragment>
      <div className="col-sm-3 sidenav">
        <ul className="list-group list-group-flush">
          {links.map((item, idx) => (
            <li
              className="list-group-item list-group-item-action list-group-item-dark"
              key={idx}
            >
              <NavLink to={item.link} end={true}>
                {item.icon}
                <span className="ms-3">{item.name}</span>
              </NavLink>
            </li>
          ))}
          <li className="list-group-item list-group-item-action list-group-item-dark">
            <a href="!#" data-bs-toggle="modal" data-bs-target="#exampleModal">
              <FaSignOutAlt className="me-3" /> Logout
            </a>
          </li>
        </ul>
      </div>
      <Modal />
    </React.Fragment>
  );
};

export const Modal = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content modal-dark">
          <div className="modal-header border border-0">
            <h4 className="modal-title">Important !!</h4>
            <div data-bs-dismiss="modal" style={{ cursor: "pointer" }}>
              close
            </div>
          </div>

          <div className="modal-body">You sure want to logout ?</div>

          <div className="modal-footer border border-0">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
