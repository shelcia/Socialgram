import React from "react";
import { Toaster } from "react-hot-toast";
import { useRoutes } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";
import { CssBaseline, ThemeProvider } from "@mui/material";
// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import routes from "./routes";
import { customTheme } from "./theme";
import "./styles/bootstrap/bootstrap-utils.css";
import "./styles/style.css";

const App = () => {
  const allPages = useRoutes(routes);

  const toasterOptions = {
    style: {
      fontWeight: 500,
      fontFamily: "'Poppins', sans-serif",
    },
  };

  const appTheme = customTheme({
    theme: "dark",
    direction: "ltr",
    // responsiveFontSizes: settings.responsiveFontSizes
  }); // toaster options

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <Toaster toastOptions={toasterOptions} />
        {allPages}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
