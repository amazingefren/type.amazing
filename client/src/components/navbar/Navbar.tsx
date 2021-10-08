import React from "react";
import { Link } from "react-router-dom";
import { m } from "framer-motion";
import "./Navbar.scss";

type NavbarLinkProps = {
  to: string;
};

const NavbarLink: React.FC<NavbarLinkProps> = ({ children, to }) => (
  <Link to={to} className="navbar__link-item">
    <m.button
      whileHover={{
        backgroundColor: "var(--bg-accent)",
        borderRadius: ["30%", "30%", "0%"],
        transition: { duration: 0.2 },
      }}
    >
      {children}
    </m.button>
  </Link>
);

export const Navbar: React.FC<{}> = () => {
  return (
    <nav className="navbar">
      <h1 className="navbar__header">Type</h1>
      <div className="navbar__link">
        <NavbarLink to={"/"}>Home</NavbarLink>
        <NavbarLink to={"/settings"}>Settings</NavbarLink>
      </div>
    </nav>
  );
};

export default Navbar;
