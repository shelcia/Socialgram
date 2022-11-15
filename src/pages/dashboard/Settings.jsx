import React from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
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
                whatsoever. All your details will be deleted forever. (not
                implemented yet)
              </Typography>
            </TableCell>
            <TableCell>
              <Button
                variant="contained"
                color="error"
                onClick={() => logout()}
                fullWidth
              >
                Delete Account
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

export default Settings;
