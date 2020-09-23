import React from "react";
import SideNav from "./SideNav";
import Adds from "./Adds";
import Feed from "../Feed/Feed";

const HomePage = () => {
  return (
    <React.Fragment>
      <SideNav />
      <Feed />
      <Adds />
    </React.Fragment>
  );
};

export default HomePage;
