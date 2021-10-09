import React from "react";
import { Game } from "components";
import "./Home.scss";

export const Home: React.FC<{}> = () => {
  return (
    <div id="home" className="full-height">
      <div id="home__game" className="full-height">
        <Game />
      </div>
    </div>
  );
};
