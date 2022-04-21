import React from "react";
import { Link, NavLink } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import {
  FaHome,
  FaUserAlt,
  FaStickyNote,
  FaCog,
  // FaSignOutAlt,
} from "react-icons/fa";
import { Modal } from "./SideNav";

const Navbar = () => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-dark bg-dark fixed-top shadow">
        <Link className="navbar-brand" to="/">
          SocialGram
        </Link>
        <ListItems />
      </nav>
      <Modal />
    </React.Fragment>
  );
};

export default Navbar;

const ListItems = () => {
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

  return (
    <div class="dropdown dropstart">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton2"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {/* Dropdown button */}
        <HiMenuAlt3 />
      </button>
      <ul
        class="dropdown-menu dropdown-menu-dark"
        aria-labelledby="dropdownMenuButton2"
      >
        {links.map((item, idx) => (
          <li key={idx}>
            <NavLink to={item.link} end={true} className="dropdown-item">
              {/* {item.icon} */}
              <span className="ms-3">{item.name}</span>
            </NavLink>
          </li>
        ))}
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <a
            href="!#"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            class="dropdown-item"
          >
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
};
