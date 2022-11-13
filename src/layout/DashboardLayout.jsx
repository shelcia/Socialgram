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
import { HiMenuAlt3 } from "react-icons/hi";
import Adds from "../common/Add";
import SideNav from "../common/SideNav";

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

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        component="nav"
        sx={{
          backgroundColor: "rgba(10, 20, 2,.5)",
          backdropFilter: "saturate(180%) blur(5px)",
          boxShadow: "inset 0 -1px 0 0 hsla(0,0%,100%,.1)",
        }}
      >
        <Toolbar>
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
      <Box
        component="main"
        // sx={{ p: 3 }}
      >
        <Toolbar />
        <Box className="row" sx={{ px: 2, pt: 2 }}>
          <Box
            className="col-md-2"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <SideNav />
          </Box>
          <Box className="col-md-8">{children}</Box>
          <Box className="col-md-2">
            <Adds />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
