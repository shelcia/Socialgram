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
      label: "Email",
      name: "email",
    },
    {
      label: "Account Created At",
      name: "date ",
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
                    idx === 3 ? (
                      profile.date ? (
                        convertDate(profile.date)
                      ) : (
                        "-"
                      )
                    ) : (
                      profile?.[prof.name]
                    )
                  ) : idx === 2 ? (
                    profile?.[prof.name]
                  ) : idx === 3 ? (
                    profile.date ? (
                      convertDate(profile.date)
                    ) : (
                      "-"
                    )
                  ) : (
                    <TextField
                      label={prof.label}
                      name={prof.name}
                      onChange={(event) => handleInput(event)}
                      value={profile?.[prof.name]}
                      size="small"
                    ></TextField>
                  )}
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
