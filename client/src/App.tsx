import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Testa from "pages/a";
import Testb from "pages/b";
import Test from "@test";
import { AnimatedRoute, AnimatedSwitch } from "animations";
import type { HTMLMotionProps } from "framer-motion";

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
      <Link to="/a">A</Link>
      <br />
      <Link to="/b">B</Link>

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
