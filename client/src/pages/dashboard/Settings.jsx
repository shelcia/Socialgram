import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { apiUser } from "../../services/models/userModal";
import toast from "react-hot-toast";
import { CustomModal } from "../../components/CustomModal";

const Settings = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const DeleteModal = ({ open, setOpen }) => {
    const deleteUser = () => {
      setOpen(false);
      const userid = localStorage.getItem("SocialGramUserId");
      apiUser.remove(`${userid}`, "").then((res) => {
        if (res.status === "200") {
          toast.success("Your account has been successfully deleted.");
          logout();
        } else {
          toast.error("Error");
        }
      });
    };

    return (
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="deleteUser-modal"
        aria-describedby="use-this-to-deleteUser"
      >
        <CustomModal>
          <h2 id="parent-modal-title">Important !!</h2>
          <p id="parent-modal-description">
            Do you really want to delete your account ?
          </p>
          <Button onClick={deleteUser} variant="contained" color="error">
            Yes
          </Button>
          <Button
            style={{ margin: "0 10%" }}
            onClick={() => setOpen(false)}
            variant="contained"
            color="info"
          >
            No
          </Button>
        </CustomModal>
      </Modal>
    );
  };

  return (
    <React.Fragment>
      <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
        Settings
      </Typography>
      <hr />
      <Table className="table table-dark table-borderless">
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography variant="h5" component="h3" sx={{ mb: 3 }}>
                Logout
              </Typography>
              <Typography variant="p" component="p">
                You will be logged out of your account. All your posts will be
                safe.
              </Typography>
            </TableCell>
            <TableCell>
              <Button variant="contained" onClick={() => logout()} fullWidth>
                Logout
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="h5" component="h3" sx={{ mb: 3 }}>
                Delete Account
              </Typography>
              <Typography variant="p" component="p">
                Your account will be deleted. You cannot retrieve your account
                whatsoever. All your details will be deleted forever.
              </Typography>
            </TableCell>
            <TableCell>
              <Button
                variant="contained"
                color="error"
                onClick={() => setOpen(true)}
                fullWidth
              >
                Delete Account
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <DeleteModal open={open} setOpen={setOpen} />
    </React.Fragment>
  );
};

export default Settings;
