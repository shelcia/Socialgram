import React, { useState, useEffect } from "react";
import SideNav from "../../common/SideNav";
import toast from "react-hot-toast";
import Adds from "../../common/Add";
import { apiPlain } from "../../services/models/plainModel";
import ProfileTable from "./components/ProfileTable";

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);

  const [profile, setProfile] = useState({
    fname: "",
    lname: "",
    email: "",
    date: "",
  });

  const handleInput = (event) => {
    setProfile({
      ...profile,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    const ac = new AbortController();
    const userid = localStorage.getItem("SocialGramUserId");
    apiPlain.getSingle(`userdetails/${userid}`, ac.signal).then((res) => {
      setProfile(res.message);
    });
    return () => ac.abort();
  }, []);

  const editUser = (event) => {
    event.preventDefault();
    const userid = localStorage.getItem("SocialGramUserId");

    const response = { fname: profile.fname, lname: profile.lname };
    apiPlain.put(response, `userdetails/edit/${userid}`).then((res) => {
      toast.success("Successfully Edited your profile");
    });
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
