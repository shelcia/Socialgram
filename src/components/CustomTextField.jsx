import styled from "@emotion/styled";
import { TextField } from "@mui/material";

export const CommentTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#7f00ff",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#7f00ff",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "rgba(210, 210, 210, 0.125)",
    },
    "&:hover fieldset": {
      borderColor: "#d900ff",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#7f00ff",
    },
  },
});
