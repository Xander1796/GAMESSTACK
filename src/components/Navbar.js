import React, { useState } from "react";

import { NavLink, Link } from "react-router-dom";

import AppLogo from "../svgs/app-logo.svg";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("true");

  const links = [
    {
      name: "home",
      path: "/",
    },
    {
      name: "games",
      path: "/games",
    },
  ];

  return (
    <nav>
      <Link to="/" className="app-logo">
        <img src={AppLogo} alt="Website logo" />
      </Link>

      <ul className="nav-links">
        {links.map((link, i) => {
          return (
            <li key={i}>
              <NavLink to={link.path} className="nav-link">
                {link.name}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
