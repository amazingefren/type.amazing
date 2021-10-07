import React from "react";
import { Link } from "react-router-dom";
import Testa from "pages/a";
import Testb from "pages/b";
import Test from "@test";
import { AnimatedRoute, AnimatedSwitch } from "animations";
import Layout from "ui/layout/Layout";
import type { HTMLMotionProps } from "framer-motion";
import "./Theme.scss";

const PageAnimation: HTMLMotionProps<"div"> = {
  exit: {
    opacity: 0,
    x: "100vw",
  },
  initial: {
    opacity: 0,
    x: "-100vw",
  },
  animate: {
    x: 0,
    opacity: 1,
    background: "var(--fg)",
  },
  transition: {
    type: "tween",
    easings: ["easeOut"],
  },
};

const App: React.FC = () => {
  return (
    <>
      <Test />
      <Layout />
      <Link to="/a">A</Link>
      <br />
      <Link to="/b">B</Link>

      <button
        onClick={() => {
          document.documentElement.style.setProperty("--fg", "#200000");
        }}
      >
        HI
      </button>
      <button
        onClick={() => {
          document.documentElement.style.setProperty("--fg", "#002000");
        }}
      >
        HI
      </button>

      <AnimatedSwitch>
        <AnimatedRoute exact path={"/b"} animation={PageAnimation}>
          <Testb />
        </AnimatedRoute>
        <AnimatedRoute exact path={"/a"} animation={PageAnimation}>
          <Testa />
        </AnimatedRoute>
      </AnimatedSwitch>
    </>
  );
};

export default App;
