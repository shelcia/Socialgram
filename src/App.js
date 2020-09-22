import React from "react";

import "./components/styles/style.css";
import SideNav from "./components/SideNav";
import Adds from "./components/Adds";
import Feed from "./components/Feed";

const App = () => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="#!">
          Home
        </a>
      </nav>
      <div className="container">
        <div className="row mt-5">
          <SideNav />
          <Feed />
          <Adds />
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
