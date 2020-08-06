import React from "react";

const SideNav = () => {
  return (
    <React.Fragment>
      <div className="col-sm-3">
        <ul className="list-group list-group-flush">
          <li className="list-group-item list-group-item-action list-group-item-dark">
            Home
          </li>
          <li className="list-group-item list-group-item-action list-group-item-dark">
            About Us
          </li>
          <li className="list-group-item list-group-item-action list-group-item-dark">
            Privacy
          </li>
          <li className="list-group-item list-group-item-action list-group-item-dark">
            Contact Us
          </li>
          <li className="list-group-item list-group-item-action list-group-item-dark">
            Copyrights 2020
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default SideNav;
