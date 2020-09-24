import React from "react";
import { useEffect } from "react";
import Adds from "./Adds";
import SideNav from "./SideNav";
import axios from "axios";
import { useState } from "react";

const MyProfile = () => {
  const LINK = process.env.REACT_APP_HEROKU_LINK;
  const [profile, setProfile] = useState({
    fname: "",
    lname: "",
    email: "",
    date: "",
  });

  useEffect(() => {
    const userid = localStorage.getItem("SocialGramUserId");

    axios
      .get(`${LINK}userdetails/${userid}`)
      .then((response) => {
        console.log(response.data);
        setProfile(response.data);
      })
      .catch((error) => console.log(error));
  }, [LINK]);

  return (
    <React.Fragment>
      <div className="row">
        <SideNav />
        <div className="col-sm-6">
          <h1>Profile</h1>
          <hr />
          <h6>
            Fname :<p>{profile.fname}</p>
          </h6>
          <h6>
            Lname:<p>{profile.lname}</p>
          </h6>
          <h6>
            Email:<p>{profile.email}</p>
          </h6>
          <h6>
            Account Created At:<p>{profile.date}</p>
          </h6>
        </div>
        <Adds />
      </div>
    </React.Fragment>
  );
};

export default MyProfile;
