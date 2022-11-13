import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from "@mui/material";
import { convertDate } from "../../../helpers/convert";

const ProfileTable = ({ profile, isEdit, handleInput }) => {
  const profileDetails = [
    {
      label: "First Name",
      name: "fname",
    },
    {
      label: "Last Name",
      name: "lname",
    },
    {
      label: "Pronouns",
      name: "pronouns",
    },
    {
      label: "Location",
      name: "location",
    },
    {
      label: "Website",
      name: "website",
    },
    {
      label: "Bio",
      name: "bio",
    },
  ];

  const notEditableDetails = [
    {
      label: "Email",
      name: "email",
    },
    {
      label: "Account Created At",
      name: "date",
    },
  ];

  return (
    <React.Fragment>
      <TableContainer>
        <Table aria-label="profile table">
          <TableBody>
            {profileDetails.map((prof, idx) => (
              <TableRow key={idx}>
                <TableCell>{prof.label}</TableCell>
                <TableCell>
                  {!isEdit ? (
                    profile?.[prof.name]
                  ) : (
                    <TextField
                      label={prof.label}
                      name={prof.name}
                      onChange={(event) => handleInput(event)}
                      value={profile?.[prof.name]}
                      size="small"
                      fullWidth
                    ></TextField>
                  )}
                </TableCell>
              </TableRow>
            ))}

            {notEditableDetails.map((prof, idx) => (
              <TableRow key={idx}>
                <TableCell>{prof.label}</TableCell>
                <TableCell>
                  {idx === 0
                    ? profile?.[prof.name]
                    : profile.date
                    ? convertDate(profile.date)
                    : "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default ProfileTable;
