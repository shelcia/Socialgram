import React from "react";

import "./components/styles/style.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./components/HomPage/HomePage";

const App = () => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="container outside">
        <div className="row" style={{ marginTop: "14vh" }}>
          <Router>
            <Switch>
              <Route path="/" component={Login} />
              <Route path="/homepage" component={HomePage} />
            </Switch>
          </Router>
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
