import React from "react";

import "./components/styles/style.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Feed from "./components/Feed/Feed";
import Profile from "./components/HomPage/Profile";
import Settings from "./components/HomPage/Settings";
import MyPosts from "./components/HomPage/MyPost";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="container outside">
        <div className="row" style={{ marginTop: "14vh" }}>
          <Router>
            <Switch>
              <Route path="/" exact component={Login} />
              <Route path="/homepage" exact component={Feed} />
              <Route path="/homepage/profile" component={Profile} />
              <Route path="/homepage/myposts" component={MyPosts} />
              <Route path="/homepage/settings" component={Settings} />
            </Switch>
          </Router>
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
