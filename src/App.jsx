import React from "react";
import { Toaster } from "react-hot-toast";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import { customTheme } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
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
    <React.Fragment>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={appTheme}>
          <CssBaseline />
          <Toaster toastOptions={toasterOptions} />
          {allPages}
        </ThemeProvider>
      </StyledEngineProvider>
    </React.Fragment>
  );
};

export default App;
