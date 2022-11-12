import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUserAlt,
  FaStickyNote,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
} from "@mui/material";

const SideNav = () => {
  const links = [
    {
      name: "Home",
      icon: <FaHome />,
      link: "/homepage",
    },
    {
      name: "Profile",
      icon: <FaUserAlt />,
      link: "/homepage/profile",
    },
    {
      name: "My Post",
      icon: <FaStickyNote />,
      link: "/homepage/myposts",
    },
    {
      name: "Settings",
      icon: <FaCog />,
      link: "/homepage/settings",
    },
  ];

  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <List>
        {links.map((item, idx) => (
          <NavLink to={item.link} end={true} key={idx}>
            <ListItem sx={{ p: 0.75 }}>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          </NavLink>
        ))}
        <ListItem onClick={() => setOpen(true)} sx={{ p: 0.75 }}>
          <ListItemButton>
            <ListItemIcon>
              <FaSignOutAlt />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
      <LogoutModal open={open} setOpen={setOpen} />
    </React.Fragment>
  );
};

export const LogoutModal = ({ open, setOpen }) => {
  const navigate = useNavigate();

  const logout = () => {
    setOpen(false);
    localStorage.clear();
    navigate("/");
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="logout-modal"
      aria-describedby="use-this-to-logout"
    >
      <Box sx={{ ...style, width: 400 }}>
        <h2 id="parent-modal-title">Important !!</h2>
        <p id="parent-modal-description">You sure want to logout ? </p>
        <Button onClick={logout} variant="contained">
          Logout
        </Button>
      </Box>
    </Modal>
  );
};

export default SideNav;
