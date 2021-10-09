import React from "react";
import { Navbar } from "components";
import "./Layout.scss";

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <div id="layout">
        <Navbar />
      </div>
      <main id="layout__main" className="full-height">
        {children}
      </main>
    </>
  );
};
