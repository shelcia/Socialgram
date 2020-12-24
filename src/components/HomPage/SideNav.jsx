import React from "react";
import { NavLink, useHistory } from "react-router-dom";

const SideNav = () => {
  return (
    <React.Fragment>
      <div className="col-sm-3 sidenav">
        <ul className="list-group list-group-flush">
          <li className="list-group-item list-group-item-action list-group-item-dark">
            <NavLink to="/homepage" exact activeClassName="active">
              <i className="fas fa-home"></i>Home
            </NavLink>
          </li>
          <li className="list-group-item list-group-item-action list-group-item-dark">
            <NavLink to="/homepage/profile" activeClassName="active">
              <i className="fas fa-user-alt"></i>Profile
            </NavLink>
          </li>
          <li className="list-group-item list-group-item-action list-group-item-dark">
            <NavLink to="/homepage/myposts" activeClassName="active">
              <i className="fas fa-sticky-note"></i>My Post
            </NavLink>
          </li>
          <li className="list-group-item list-group-item-action list-group-item-dark">
            <NavLink to="/homepage/settings" activeClassName="active">
              <i className="fas fa-cog"></i>Settings
            </NavLink>
          </li>
          <li className="list-group-item list-group-item-action list-group-item-dark">
            <a href="!#" data-toggle="modal" data-target="#logoutModal">
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
  const history = useHistory();

  const logout = () => {
    localStorage.clear();
    history.push("/");
  };
  return (
    <div className="modal fade" id="logoutModal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content modal-dark">
          <div className="modal-header border border-0">
            <h4 className="modal-title">Important !!</h4>
            <div data-dismiss="modal" style={{ cursor: "pointer" }}>
              <i className="fas fa-times"></i> close
            </div>
          </div>

          <div className="modal-body">You sure want to logout ?</div>

          <div className="modal-footer border border-0">
            <button
              type="button"
              className="btn btn-primary"
              data-dismiss="modal"
              onClick={() => logout()}
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
