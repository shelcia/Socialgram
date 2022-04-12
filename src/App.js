import React from "react";
import { Toaster } from "react-hot-toast";
import { useRoutes } from "react-router-dom";
import Navbar from "./common/Navbar";
import "./styles/style.css";
import routes from "./routes";

const App = () => {
  // const isAuthenticated = () => {
  //   return localStorage.getItem("SocialGramToken") ? true : false;
  // };

  const allPages = useRoutes(routes);

  const toasterOptions = {
    style: {
      fontWeight: 500,
      fontFamily: "'Fira Sans', sans-serif",
    },
  };

  return (
    <React.Fragment>
      <Toaster toastOptions={toasterOptions} />
      <div className="container outside">
        <div className="row" style={{ marginTop: "14vh" }}>
          <Navbar />
          {allPages}

          {/* <Router>
            <Navbar />
            <Switch>
              <Route path="/" exact component={AuthPage} />
              <PrivateRoute path="/homepage" exact component={Feed} />
              <PrivateRoute path="/homepage/profile" component={Profile} />
              <PrivateRoute path="/homepage/myposts" component={MyPosts} />
              <PrivateRoute path="/homepage/settings" component={Settings} />
              <PrivateRoute component={Error404} />
            </Switch>
          </Router> */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
