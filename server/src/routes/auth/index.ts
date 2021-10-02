import * as passport from "passport";
import { Router } from "express";

// import User from "../../models/user.model";
import { RegisterInput } from "./dto/user.dto";

import log from "../../utils/logger";
const logger = log("/auth");

const router = Router();

router.get("/login", (req, res) => {
  if (req.isAuthenticated()) return res.send("HII");
  res.send("You're not logged in");
});

router.post("/login", passport.authenticate("local", { successRedirect: "/" }));

router.post("/register", (req, res) => {
  if (req.body.password) return res.send("hi");
  logger.debug(JSON.stringify(req.body));
  res.send(true);
});

export default router;
