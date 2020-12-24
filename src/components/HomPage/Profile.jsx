import React from "react";
import { useEffect } from "react";
import Adds from "./Adds";
import SideNav from "./SideNav";
import axios from "axios";
import { useState } from "react";
import ProfileTable from "./ProfileTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);

  const LINK = process.env.REACT_APP_HEROKU_LINK;
  const [profile, setProfile] = useState({
    fname: "",
    lname: "",
    email: "",
    date: "",
  });

  const handleInput = (event) => {
    const newProfile = {
      ...profile,
      [event.target.name]: event.target.value,
    };
    console.log(newProfile);
    setProfile(newProfile);
  };

  useEffect(() => {
    const userid = localStorage.getItem("SocialGramUserId");

    axios
      .get(`${LINK}userdetails/${userid}`)
      .then((response) => {
        setProfile(response.data.message);
      })
      .catch((error) => console.log(error));
  }, [LINK]);

  const editUser = (event) => {
    event.preventDefault();
    const userid = localStorage.getItem("SocialGramUserId");

    const response = { fname: profile.fname, lname: profile.lname };
    axios
      .put(`${LINK}userdetails/edit/${userid}`, response)
      .then((res) => {
        toast.success("Successfully Edited your profile");
      })
      .catch((error) => console.log(error));
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="row">
        <SideNav />
        <div className="col-sm-6">
          <h1>Profile</h1>
          <hr />
          <ProfileTable
            profile={profile}
            isEdit={isEdit}
            handleInput={handleInput}
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
