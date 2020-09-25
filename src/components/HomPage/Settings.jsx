import React from "react";
import Adds from "./Adds";
import SideNav from "./SideNav";

const Settings = () => {
  return (
    <React.Fragment>
      <div className="row">
        <SideNav />
        <div className="col-sm-6">
          <h1>Settings</h1>
          <hr />
          <table className="table table-dark table-striped">
            <tbody>
              <tr>
                <td>
                  <b>Logout</b>
                  <br />
                  You will be logged out of your account. All your posts will be
                  safe.
                </td>
                <td>
                  <button className="btn btn-warning">Logout</button>
                </td>
              </tr>
              <tr>
                <td>
                  <b>Delete Account</b> <br />
                  Your account will be deleted. You cannot retreive your
                  whatsoever. All your details will be deleted forever.
                </td>
                <td>
                  <button className="btn btn-danger">Delete Account</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Adds />
      </div>
    </React.Fragment>
  );
};

export default Settings;
