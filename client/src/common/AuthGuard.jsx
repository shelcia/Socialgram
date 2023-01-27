import React, { Fragment, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom"; // component props interface
//import Login from "../pages/auth/Login";

const AuthGuard = ({ children }) => {
  function isAuthenticate() {
    return localStorage.getItem("SocialGramToken") ? true : false;
  }

  function useAuth() {
    // console.log(isAuthenticate(), isExpired);
    if (!isAuthenticate()) {
      return false;
    } else {
      return true;
    }
    // return isAuthenticate() && !isExpired;
  }

  const navigate = useNavigate();

  const isAuthenticated = useAuth();
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);

  // console.log({ isAuthenticated, requestedLocation, pathname });

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }

   // navigate("/login");
    window.location.href = "/login";

    // return <Login />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <Fragment>{children}</Fragment>;
};

export default AuthGuard;
