// import React from "react";
// import { Link, NavLink } from "react-router-dom";
// import { HiMenuAlt3 } from "react-icons/hi";
// import {
//   FaHome,
//   FaUserAlt,
//   FaStickyNote,
//   FaCog,
//   // FaSignOutAlt,
// } from "react-icons/fa";
// import { Modal } from "./SideNav";

// const Navbar = () => {
//   return (
//     <React.Fragment>
//       <nav className="navbar navbar-dark bg-dark fixed-top shadow">
//         <Link className="navbar-brand" to="/">
//           SocialGram
//         </Link>
//         <ListItems />
//       </nav>
//       <Modal />
//     </React.Fragment>
//   );
// };

// export default Navbar;

// const ListItems = () => {
//   const links = [
//     {
//       name: "Home",
//       icon: <FaHome />,
//       link: "/homepage",
//     },
//     {
//       name: "Profile",
//       icon: <FaUserAlt />,
//       link: "/homepage/profile",
//     },
//     {
//       name: "My Post",
//       icon: <FaStickyNote />,
//       link: "/homepage/myposts",
//     },
//     {
//       name: "Settings",
//       icon: <FaCog />,
//       link: "/homepage/settings",
//     },
//   ];

//   return (
//     <div className="dropdown dropstart">
//       <button
//         className="btn btn-secondary dropdown-toggle"
//         type="button"
//         id="dropdownMenuButton2"
//         data-bs-toggle="dropdown"
//         aria-expanded="false"
//       >
//         {/* Dropdown button */}
//         <HiMenuAlt3 />
//       </button>
//       <ul
//         className="dropdown-menu dropdown-menu-dark"
//         aria-labelledby="dropdownMenuButton2"
//       >
//         {links.map((item, idx) => (
//           <li key={idx}>
//             <NavLink to={item.link} end={true} className="dropdown-item">
//               {/* {item.icon} */}
//               <span className="ms-3">{item.name}</span>
//             </NavLink>
//           </li>
//         ))}
//         <li>
//           <hr className="dropdown-divider" />
//         </li>
//         <li>
//           <a
//             href="!#"
//             data-bs-toggle="modal"
//             data-bs-target="#exampleModal"
//             className="dropdown-item"
//           >
//             Logout
//           </a>
//         </li>
//       </ul>
//     </div>
//   );
// };
import * as React from "react";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  List,
  Button,
} from "@mui/material";
import { HiMenuAlt3 } from "react-icons/hi";

const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];

function DrawerAppBar({ children }, props) {
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
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            {/* <ListItemButtom sx={{ textAlign: "center" }}> */}
            <ListItemText primary={item} />
            {/* </ListItemButtom> */}
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <HiMenuAlt3 />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            SocialGram
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: "#fff" }}>
                {item}
              </Button>
            ))}
          </Box>
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
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

export default DrawerAppBar;
