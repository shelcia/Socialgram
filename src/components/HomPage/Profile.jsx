import React from "react";
import { useEffect } from "react";
import Adds from "./Adds";
import SideNav from "./SideNav";
import axios from "axios";
import { useState } from "react";
import ProfileTable from "./ProfileTable";

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

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
        setProfile(response.data.message);
      })
      .catch((error) => console.log(error));
  }, [LINK]);

  const editUser = (event) => {
    event.preventDefault();
    const userid = localStorage.getItem("SocialGramUserId");

    const response = { fname: fname, lname: lname };
    axios
      .put(`${LINK}userdetails/edit/${userid}`, response)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  return (
    <React.Fragment>
      <div className="row">
        <SideNav />
        <div className="col-sm-6">
          <h1>Profile</h1>
          <hr />
          <ProfileTable
            profile={profile}
            isEdit={isEdit}
            setFname={setFname}
            setLname={setLname}
          />
          <div className="text-center mt-5">
            {!isEdit ? (
              <button
                className="btn btn-outline-primary"
                onClick={() => setIsEdit(true)}
              >
                Edit Profile Details
              </button>
            ) : (
              <button
                className="btn btn-warning"
                onClick={(event) => {
                  editUser(event);
                  setIsEdit(false);
                }}
              >
                Confirm
              </button>
            )}
          </div>
        </div>
        <Adds />
      </div>
    </React.Fragment>
  );
};

export default MyProfile;
