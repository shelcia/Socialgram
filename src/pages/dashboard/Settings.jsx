import React from "react";
import { useNavigate } from "react-router-dom";
import Adds from "../../common/Add";
import SideNav from "../../common/SideNav";

const Settings = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <React.Fragment>
      <div className="row">
        <SideNav />
        <div className="col-sm-6">
          <h1>Settings</h1>
          <hr />
          <table className="table table-dark table-borderless">
            <tbody>
              <tr>
                <td>
                  <p className="font-weight-bold" onClick={() => logout()}>
                    Logout
                  </p>
                  <p>
                    You will be logged out of your account. All your posts will
                    be safe.
                  </p>
                </td>
                <td>
                  <button className="btn btn-warning">Logout</button>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="font-weight-bold">Delete Account</p>
                  <p>
                    Your account will be deleted. You cannot retrieve your
                    account whatsoever. All your details will be deleted
                    forever.
                  </p>
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
