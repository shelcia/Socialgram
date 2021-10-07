import React from "react";
import "./components/styles/style.css";
import Navbar from "./components/Navbar";
import Feed from "./components/Feed/Feed";
import Profile from "./components/HomPage/Profile";
import Settings from "./components/HomPage/Settings";
import MyPosts from "./components/HomPage/MyPost";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import AuthPage from "./components/auth/Auth";
import Error404 from "./components/Error404";

const App = () => {
  const isAuthenticated = () => {
    return localStorage.getItem("SocialGramToken") ? true : false;
  };

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );

  return (
    <React.Fragment>
      <div className="container outside">
        <div className="row" style={{ marginTop: "14vh" }}>
          <Router>
            <Navbar />
            <Switch>
              <Route path="/" exact component={AuthPage} />
              <PrivateRoute path="/homepage" exact component={Feed} />
              <PrivateRoute path="/homepage/profile" component={Profile} />
              <PrivateRoute path="/homepage/myposts" component={MyPosts} />
              <PrivateRoute path="/homepage/settings" component={Settings} />
              <PrivateRoute component={Error404} />
            </Switch>
          </Router>
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
