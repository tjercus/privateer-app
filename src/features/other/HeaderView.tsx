import React from "react";
import { Navbar, NavbarNav, NavbarNavMenu } from "@vismaux/react-nc4";
import { Link } from "react-router-dom";

export const HeaderView = () => (
  <Navbar>
    <NavbarNav>
      <NavbarNavMenu>
        <li role="none">
          <Link to={"/"} className="nav-item" role="menuitem">
            Home
          </Link>
        </li>
        <li role="none">
          <Link className="nav-item" role="menuitem" to={"/planet"}>
            Planets
          </Link>
        </li>
        <li role="none">
          <Link className="nav-item" role="menuitem" to={"/spaceship"}>
            Spaceships
          </Link>
        </li>
      </NavbarNavMenu>
    </NavbarNav>
  </Navbar>
);
