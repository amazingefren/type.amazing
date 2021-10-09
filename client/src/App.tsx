import React from "react";
import { AnimatedRoute, AnimatedSwitch } from "animations";
import { LazyMotion, domAnimation } from "framer-motion";
import { Home, Settings } from "pages";
import { Layout } from "ui";
import "./Theme.scss";
import "./App.scss";

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
    // background: "var(--fg)",
  },
  transition: {
    type: "tween",
    easings: ["easeOut"],
  },
};

const App: React.FC = () => {
  return (
    <>
      <LazyMotion features={domAnimation} strict>
        <Layout>
          <AnimatedSwitch>
            <AnimatedRoute exact path={"/"} animation={PageAnimation}>
              <Home />
            </AnimatedRoute>
            <AnimatedRoute exact path={"/settings"} animation={PageAnimation}>
              <Settings />
            </AnimatedRoute>
          </AnimatedSwitch>
        </Layout>
      </LazyMotion>
    </>
  );
};

export default App;
