import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { blue, deepPurple, green, orange } from "@mui/material/colors";

export const PurpleButton = styled(Button)(({ theme }) => ({
  // color: theme.palette.getContrastText(purple[500]),
  // backgroundColor: purple[500],
  borderRadius: "50ex",
  minWidth: 0,
  padding: 8,
  "&:hover": {
    color: deepPurple[700],
  },
}));

export const BlueButton = styled(Button)(({ theme }) => ({
  // color: theme.palette.getContrastText(purple[500]),
  // backgroundColor: purple[500],
  borderRadius: "50ex",
  minWidth: 0,
  padding: 8,
  "&:hover": {
    color: blue[700],
  },
}));

export const GreenButton = styled(Button)(({ theme }) => ({
  borderRadius: "50ex",
  minWidth: 0,
  padding: 8,
  "&:hover": {
    color: green[700],
  },
}));

export const OrangeButton = styled(Button)(({ theme }) => ({
  borderRadius: "50ex",
  minWidth: 0,
  padding: 8,
  "&:hover": {
    color: orange[800],
  },
  "&:disabled": {
    color: orange[800],
  },
}));
