import React from "react";
import { Toaster } from "react-hot-toast";
import { useRoutes } from "react-router-dom";
import Navbar from "./common/Navbar";
import "./styles/style.css";
import routes from "./routes";

const App = () => {
  const allPages = useRoutes(routes);

  const toasterOptions = {
    style: {
      fontWeight: 500,
      fontFamily: "'Fira Sans', sans-serif",
    },
  };

  return (
    <React.Fragment>
      <Toaster toastOptions={toasterOptions} />
      <div className="container outside">
        <div className="row" style={{ marginTop: "14vh" }}>
          <Navbar />
          {allPages}
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
