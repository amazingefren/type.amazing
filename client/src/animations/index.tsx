import React from "react";
import { AnimatePresence, m } from "framer-motion";
import { Route, Switch, useLocation } from "react-router-dom";

import type { HTMLMotionProps } from "framer-motion";

export const AnimatedSwitch: React.FC = ({ children }) => {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter={true} initial={true}>
      <Switch location={location} key={location.pathname}>
        {children}
      </Switch>
    </AnimatePresence>
  );
};

type AnimatedRouteProps = {
  exact?: boolean;
  path: string;
  animation: HTMLMotionProps<"div">;
};

export const AnimatedRoute: React.FC<AnimatedRouteProps> = ({
  children,
  exact = false,
  path,
  animation,
  ...rest
}) => {
  return (
    <Route exact={exact} path={path} {...rest}>
      <m.div {...animation} className="full-height">
        {children}
      </m.div>
    </Route>
  );
};
