import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-dark bg-dark fixed-top shadow">
        <Link className="navbar-brand" to="/">
          SocialGram
        </Link>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
