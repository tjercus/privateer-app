import React from "react";
import {Navbar, NavbarNav, NavbarNavMenu, NavbarNavMenuItem} from "@vismaux/react-nc4";

export const Header = () =>
  <Navbar>
    <NavbarNav>
      <NavbarNavMenu>
        <NavbarNavMenuItem>Home</NavbarNavMenuItem>
        <NavbarNavMenuItem>Blog</NavbarNavMenuItem>
        <NavbarNavMenuItem>Documents</NavbarNavMenuItem>
      </NavbarNavMenu>
    </NavbarNav>
  </Navbar>