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
  Alert,
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
} from "@mui/material";
import { CustomModal } from "../components/CustomModal";

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
      <List className="sidenav">
        {links.map((item, idx) => (
          <NavLink to={item.link} end={true} key={idx}>
            <ListItem sx={{ p: 0.5 }}>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
                <span className="span"></span>
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
      <Alert severity="info">Please keep this safe and welcome!</Alert>
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

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="logout-modal"
      aria-describedby="use-this-to-logout"
    >
      <CustomModal>
        <h2 id="parent-modal-title">Important !!</h2>
        <p id="parent-modal-description">You sure want to logout ? </p>
        <Button onClick={logout} variant="contained" color="info">
          Logout
        </Button>
      </CustomModal>
    </Modal>
  );
};

export default SideNav;
