import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const SideNav = () => {
  const links = [
    {
      name: "Home",
      icon: "fa-home",
      link: "/homepage",
    },
    {
      name: "Profile",
      icon: "fa-user-alt",
      link: "/homepage/profile",
    },
    {
      name: "My Post",
      icon: "fa-sticky-note",
      link: "/homepage/myposts",
    },
    {
      name: "Settings",
      icon: "fa-cog",
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
                <i className={`fas ${item.icon}`}></i>
                {item.name}
              </NavLink>
            </li>
          ))}
          <li className="list-group-item list-group-item-action list-group-item-dark">
            <a href="!#" data-bs-toggle="modal" data-bs-target="#exampleModal">
              <i className="fas fa-sign-out-alt"></i>Logout
            </a>
          </li>
        </ul>
      </div>
      <Modal />
    </React.Fragment>
  );
};

const Modal = () => {
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
              <i className="fas fa-times"></i> close
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
