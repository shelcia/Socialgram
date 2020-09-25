import React from "react";

const ProfileTable = ({ profile, isEdit, setFname, setLname }) => {
  console.log(profile.date);

  return (
    <React.Fragment>
      <table className="table table-dark table-striped">
        <tbody>
          <tr>
            <th>First Name</th>
            <td>
              {!isEdit ? (
                profile.fname
              ) : (
                <input
                  className="form-control"
                  onChange={(event) => setFname(event.target.value)}
                ></input>
              )}
            </td>
          </tr>
          <tr>
            <th>Last Name</th>
            <td>
              {" "}
              {!isEdit ? (
                profile.lname
              ) : (
                <input
                  className="form-control"
                  onChange={(event) => setLname(event.target.value)}
                ></input>
              )}
            </td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{profile.email}</td>
          </tr>
          <tr>
            <th>Account Created At</th>
            <td>
              {profile.date ? Date(profile.date).toString() : profile.date}
            </td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default ProfileTable;
