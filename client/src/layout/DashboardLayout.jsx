import React from "react";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  Divider,
} from "@mui/material";
import Fab from "@mui/material/Fab";
import { HiMenuAlt3, HiChevronUp } from "react-icons/hi";
import Adds from "../common/Add";
import SideNav from "../common/SideNav";
import Img1 from "../assets/home/gradient-left-dark.svg";
import Img2 from "../assets/home/gradient-right-dark.svg";
import ScrollTop from "../components/CustomScrollToTop";

const drawerWidth = 240;

const DashboardLayout = ({ children }, props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        SocialGram
      </Typography>
      <Divider />
      <SideNav />
    </Box>
  );

  // eslint-disable-next-line operator-linebreak
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <img src={Img1} alt="" style={{ position: "fixed", zIndex: -1 }} />
      <img src={Img2} alt="" style={{ position: "fixed", zIndex: -1 }} />
      <AppBar
        component="nav"
        sx={{
          backgroundColor: "rgba(10, 20, 2,.5)",
          backdropFilter: "saturate(180%) blur(5px)",
          boxShadow: "inset 0 -1px 0 0 hsla(0,0%,100%,.1)",
        }}
      >
        <Toolbar id="back-to-top-anchor">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SocialGram
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <HiMenuAlt3 />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "rgba(10, 20, 2,.5)",
              backdropFilter: "saturate(180%) blur(5px)",
              boxShadow: "inset 0 -1px 0 0 hsla(0,0%,100%,.1)",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main">
        <Toolbar />
        <Box className="row" sx={{ px: 2, pt: 2 }}>
          <Box
            className="col-md-2"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <SideNav />
          </Box>
          <Box className="col-md-7">{children}</Box>
          <Box className="col-md-3">
            <Adds />
          </Box>
        </Box>
      </Box>
      <ScrollTop>
        <Fab aria-label="scroll back to top" color="info">
          <HiChevronUp size="1.5rem" />
        </Fab>
      </ScrollTop>
    </Box>
  );
};

export default DashboardLayout;
