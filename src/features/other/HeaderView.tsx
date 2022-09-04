import React from "react";
import { Navbar, NavbarNav, NavbarNavMenu } from "@vismaux/react-nc4";
import { Link, useLocation } from "react-router-dom";
import { firstUrlSegment } from "../../common/utils";

export const HeaderView = () => {
  let { pathname } = useLocation();
  const noun = firstUrlSegment(pathname);

  return (
    <Navbar>
      <NavbarNav>
        <NavbarNavMenu>
          <li className={"" === noun ? "active" : ""} role="none">
            <Link
              aria-selected={"" === noun}
              className="nav-item"
              data-test={"link-home"}
              role="menuitem"
              to={"/"}
            >
              {"Home"}
            </Link>
          </li>
          <li className={"hardware" === noun ? "active" : ""} role="none">
            <Link
              aria-selected={"hardware" === noun}
              className="nav-item"
              data-test={"link-hardware"}
              role="menuitem"
              to={"/hardware"}
            >
              {"Hardware"}
            </Link>
          </li>
          <li className={"planet" === noun ? "active" : ""} role="none">
            <Link
              aria-selected={"planet" === noun}
              className="nav-item"
              data-test={"link-planet"}
              role="menuitem"
              to={"/planet"}
            >
              {"Planet"}
            </Link>
          </li>
          <li className={"spaceship" === noun ? "active" : ""} role="none">
            <Link
              aria-selected={"spaceship" === noun}
              className="nav-item"
              data-test={"link-spaceship"}
              role="menuitem"
              to={"/spaceship"}
            >
              {"Spaceship"}
            </Link>
          </li>
        </NavbarNavMenu>
      </NavbarNav>
    </Navbar>
  );
};
