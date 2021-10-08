import React from "react";
import { Navbar } from "components";
import "./Layout.scss";

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <main>{children}</main>
    </>
  );
};
